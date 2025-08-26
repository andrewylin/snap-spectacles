# Resolving Permission Issues in SpeedDisplay

## Problem Description

The SpeedDisplay lens encounters permission errors when trying to use both location services and network APIs simultaneously. According to the [Spectacles permissions documentation](https://developers.snap.com/spectacles/permission-privacy/overview), this combination requires **Extended Permissions**.

## Error Messages

```
InternalError: Cannot invoke 'getCurrentPosition': Sensitive user data not available in lenses with network APIs
```

## Root Cause

The lens uses **both**:
1. **Location services** (`RawLocationModule`) - Sensitive user data
2. **Network APIs** (`RemoteServiceModule` via `SnapPlacesProvider`) - External connectivity

According to the [Spectacles permissions documentation](https://developers.snap.com/spectacles/permission-privacy/overview):

> **Extended Permissions are required when both of the following conditions are met:**
> 1. **External Connectivity**: Internet access OR Bluetooth peripheral access OR Connected Lenses OR Cloud Storage
> 2. **Sensitive Data**: Camera access OR Microphone access OR Location access (precise or coarse)

## Solution Options

### Option 1: Disable Network Features (Recommended for Testing)

The lens now has a built-in flag to disable network features:

```typescript
// In your test script
this.mapComponent.setNetworkFeaturesEnabled(false);
```

**Benefits:**
- ✅ No permission issues
- ✅ Basic speed display works
- ✅ Map follows user location
- ✅ No experimental API requirements

**Limitations:**
- ❌ No nearby places functionality
- ❌ No Snap Places API integration

### Option 2: Enable Extended Permissions

To use both location and network features, enable Extended Permissions in Lens Studio:

1. **Project Settings** → **Spectacles** section
2. **Enable Extended Permissions**
3. **Note**: This makes your lens experimental and requires special approval

**Benefits:**
- ✅ Full functionality including places API
- ✅ No feature restrictions

**Limitations:**
- ❌ Lens becomes experimental
- ❌ Requires special approval for publishing
- ❌ May have limited distribution

## Implementation Details

### Network Features Control

The `MapController` now includes a flag to control network features:

```typescript
// Flag to disable network features to avoid permission issues
private enableNetworkFeatures: boolean = false;

/**
 * Enable or disable network features (requires Extended Permissions when enabled)
 */
setNetworkFeaturesEnabled(enabled: boolean): void {
  this.enableNetworkFeatures = enabled;
  log.i(`Network features ${enabled ? 'enabled' : 'disabled'}`);
}
```

### Automatic Network Feature Disabling

When `enableNetworkFeatures` is `false`:
- `showNearbyPlaces()` returns immediately with "no places found"
- No network requests are made
- Location services work normally

### Testing Without Network Features

Use the `SpeedDisplaySimpleTest` component:

```typescript
@component
export class SpeedDisplaySimpleTest extends BaseScriptComponent {
  @input
  private mapComponent: MapComponent;
  
  onStart() {
    // Disable network features to avoid permission issues
    this.mapComponent.setNetworkFeaturesEnabled(false);
    
    // Test basic functionality
    const speed = this.mapComponent.getUserSpeed();
    print(`Current speed: ${speed} mph`);
  }
}
```

## Recommended Approach

1. **Development/Testing**: Use Option 1 (disable network features)
   - Focus on core speed display functionality
   - Avoid permission complications
   - Faster development cycle

2. **Production with Full Features**: Use Option 2 (Extended Permissions)
   - Enable all features including places API
   - Submit for experimental lens approval
   - Full user experience

## File Structure

```
Assets/MapComponent/Scripts/
├── SpeedDisplay.ts                    # Core speed display component
├── SpeedDisplayController.ts          # Integration controller
├── SpeedDisplaySimpleTest.ts          # Test without network features
├── SpeedDisplayExample.ts             # Full example with network features
└── README_PermissionIssues.md         # This file
```

## Next Steps

1. **Test basic functionality** with network features disabled
2. **Verify speed display works** without permission errors
3. **Choose deployment strategy** based on feature requirements
4. **Apply for Extended Permissions** if full functionality is needed

## References

- [Spectacles Location API Documentation](https://developers.snap.com/spectacles/about-spectacles-features/apis/location)
- [Spectacles Permissions Overview](https://developers.snap.com/spectacles/permission-privacy/overview)
- [Extended Permissions Guide](https://developers.snap.com/spectacles/permission-privacy/overview#what-is-extended-permissions)
