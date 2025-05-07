/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */
import Gio from "gi://Gio";
import GLib from "gi://GLib";
import * as Main from "resource:///org/gnome/shell/ui/main.js";
import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";

export default class PowerProfileNotifier extends Extension {
  enable() {
    this._signalId = Gio.DBus.system.signal_subscribe(
      "net.hadess.PowerProfiles",
      "org.freedesktop.DBus.Properties",
      "PropertiesChanged",
      "/net/hadess/PowerProfiles",
      null,
      Gio.DBusSignalFlags.NONE,
      this._onPropertiesChanged.bind(this),
    );

    log("[PowerProfileExtension] Enabled");
  }

  disable() {
    if (this._signalId !== null) {
      Gio.DBus.system.signal_unsubscribe(this._signalId);
      this._signalId = null;
    }

    log("[PowerProfileExtension] Disabled");
  }

  _onPropertiesChanged(
    connection,
    sender,
    objectPath,
    interfaceName,
    signalName,
    parameters,
  ) {
    let [iface, changedProps, _invalidatedProps] = parameters.deep_unpack();

    if (iface !== "net.hadess.PowerProfiles") return;

    if ("ActiveProfile" in changedProps) {
      let profile = changedProps["ActiveProfile"].deep_unpack();
      log(`[PowerProfileExtension] Power profile changed to: ${profile}`);

      const prettyLabel = this._formatProfileLabel(profile);
      const iconName = this._getIconForProfile(profile);
      const icon = Gio.Icon.new_for_string(iconName);

      Main.osdWindowManager.show(-1, icon, prettyLabel, null, null);
    }
  }

  _formatProfileLabel(profile) {
    switch (profile) {
      case "power-saver":
        return "Power Saver";
      case "balanced":
        return "Balanced";
      case "performance":
        return "Performance";
      default:
        return profile;
    }
  }

  _getIconForProfile(profile) {
    switch (profile) {
      case "power-saver":
        return "power-profile-power-saver-symbolic";
      case "balanced":
        return "power-profile-balanced-symbolic";
      case "performance":
        return "power-profile-performance-symbolic";
      default:
        return "battery-symbolic";
    }
  }
}
