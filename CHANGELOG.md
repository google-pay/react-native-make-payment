# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.3.1]

### Fixed
- **Prop Mapping for Dual Architectures**: Corrected the native Android `@ReactProp` annotation name from `"buttonType"` to `"type"`. This aligns it with the TS/codegen spec and ensures the Google Pay button type works correctly across both the Old Architecture (Paper) and New Architecture (Fabric).

---

## [0.3.0]

### Added
- **TypeScript & Codegen Alignment**: Resolved issues where React Native Codegen does not support union types. Added missing types and restructured exports to ensure full compatibility with the Fabric/TurboModule codegen system.
- **Google Pay Schema Alignment**: Made `merchantId` in `merchantInfo` requests optional to align exactly with the Google Pay API specifications.

### Fixed
- **Memory Leak resolved in GooglePayButtonComponent**: Fixed a memory leak on Android where the `GlobalLayoutListener` was not being cleaned up, by properly removing the listener when the view detached from the window.
- **Simplified Android Manifest Requirements**: Updated setup documentation to remove the requirement of setting `com.google.android.gms.wallet.api.enabled` manually, streamlining the developer integration flow.
- **New Architecture Prop Compatibility**: Addressed a layout and mapping mismatch between New Architecture (Fabric) and legacy Paper bridge prop resolutions for the Google Pay button.

---

## [0.2.2]

### Fixed
- **iOS Nullability & Native Module Crashes**: Added safeguards to ensure that referencing the Google Pay native module or accessing `GooglePayButtonConstants` on iOS (or other unsupported platforms) returns `null` safely instead of crashing.
- **Example App iOS Compile**: Overrode constant checks in the example app to allow clean builds and mock payment flows on iOS.

---

## [0.2.1]

### Added
- **Stabilized Workspace Package Import**: Refactored the internal example application to cleanly import the library package using Yarn workspaces.

### Fixed
- **GooglePayButtonConstants TypeScript Types**: Corrected typing definitions and property accessors for the exported button configuration constants.

---

## [0.1.6]

### Added
- **React Native New Architecture Support**: Introduced full support for TurboModules and Fabric (newarch) while maintaining backwards compatibility with the legacy Bridge (Paper) architecture.
- **Improved Type Coverage**: Added explicit typings for `GooglePayPaymentData` and added partial typings for the `info` field inside `GooglePayPaymentMethodData`.

### Fixed
- **Safe Nullable Array Parsing**: Enhanced Android JSON parser helpers (`mapToJson` and `arrayToJson`) to gracefully handle null values in nested `ReadableArray` structures instead of throwing runtime exceptions.
- **Kotlin Lateinit Crash Prevention**: Resolved a potential crash by correcting uninitialized `lateinit` properties on Android.
- **Build Exports**: Cleaned up package bundling, exports, and circular dependencies in TypeScript files.

---

## [0.1.5]

### Added
- **SDK Dependency Upgrade**: Upgraded the core `play-services-wallet` dependency on Android to `19.4.0` for improved security and performance.

---

## [0.1.4]

### Added
- **AGP 7+ Namespace Support**: Added the required namespace field to the Android `build.gradle` file, allowing seamless compilation with newer Android Gradle Plugin versions (7.x and 8.x).

### Fixed
- **Duplicate View Manager Registration**: Fixed a crash where React Native threw a `"Tried to register two views with the same name GooglePayButton"` error.
- **iOS Get-Constants Protection**: Handled potential null references when retrieving constants from non-existent native modules on iOS.
- **Deprecation Warnings**: Resolved Android package name deprecation warnings in native Gradle builds.

---

## [0.1.3]

### Added
- **Google Pay Native Button Wrapper**: Introduced a high-quality, native Android `PayButton` wrapper view component.
- **Layout Refresh Integration**: Added manual `requestLayout()` triggers inside the native layout view to ensure immediate button redraws.

### Fixed
- **NextJS Dependency**: Removed `next` from the package.json's required peer dependencies, reducing project bloat.

---

## [0.1.1]

### Fixed
- **Immutable softwareInfo Fix**: Patched a bug when assigning software metadata information when the SDK's `softwareInfo` configuration object was set to immutable.

---

## [0.1.0]

### Added
- **Initial Release**: Initial implementation of the React Native Make Payment library wrapping Google Pay's API under a W3C-inspired Payment Request specification.
