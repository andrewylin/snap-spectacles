# Simple Speed Display
Tired of looking down at your car dashboard to know how fast you're going but don't want to pay for an overpriced trim that has an HUD? Or do you feel unsafe looking down at your bike computer or watch while going downhill but really want to know how fast you're going? Look no further than the simple speedometer! Thanks to AR, you can now know your speed without looking in another direction.

![ACB7FDE8-0E81-4E1A-8058-AAAF10FF658F_1_206_a](https://github.com/user-attachments/assets/dd705c19-b942-4c7e-bd88-4299728e2b6a)

## Simple Speed Display Setup
This guide shows how to set up the speed display using the simplified components.

Start by cloning this repo and opening OutdoorNavigation.esproj in Lens Studio 5.12+. Ensure Experimental APIs are enabled in the project settings.

Note that this Lens was created by starting with the Outdoor Navigation Sample Project in the [Spectacles Sample repo](https://github.com/Snapchat/Spectacles-Sample) and vibe coding with Cursor

## Files Created

- **SpeedDisplaySimple.prefab**: Simple prefab with just UI elements
- **SpeedDisplaySimpleController.ts**: Controller that handles all logic
- **README_SimpleSetup.md**: This setup guide

## Setup Instructions

### 1. Add Components to Scene

1. **Create a SceneObject** in your scene (e.g., "SpeedDisplayContainer")
2. **Add SpeedDisplaySimpleController component** to this object
3. **Configure the inputs** in the Inspector:
   - `mapComponent`: Reference to your MapComponent
   - `speedDisplayPrefab`: Drag SpeedDisplaySimple.prefab here
   - `speedDisplayParent`: The SceneObject that should contain the speed display (usually a Canvas or UI parent)

### 2. Scene Hierarchy Example

```
Camera Object
├── Scene
    └── MapComponent (with MapComponent script)
        └── Container
            └── SpeedDisplaySimpleController (with SpeedDisplaySimpleController script)
                └── speedDisplaySimple Prefab: → SpeedDisplaySimple.prefab
                    └── speedDisplaySimple text object
```

### 3. What Happens at Runtime

1. **SpeedDisplaySimpleController** starts up
2. **Disables network features** automatically (avoids permission issues)
3. **Instantiates SpeedDisplaySimple.prefab** under the specified parent
4. **Finds the Text component** in the prefab
5. **Starts monitoring speed** from MapComponent
6. **Updates text display** with current speed in mph

## Visual Appearance

The speed display appears in the center with:
- **White text** with black shadow for readability
- **Semi-transparent background** for contrast
- **Bold 18pt font** for clear visibility
- **"0.0 mph"** format with one decimal place

## Troubleshooting

### Speed Shows "0.0 mph"
- Ensure you're outdoors with good GPS signal
- Check that location permissions are enabled on the device
- Verify that the MapComponent is properly configured

### Prefab Won't Load
- Make sure SpeedDisplaySimple.prefab is properly imported
- Check that all file references are connected in Inspector
- Try recreating the SpeedDisplayContainer object

### Permission Errors
- The controller automatically disables network features
- If you still get permission errors, check that `require('LensStudio:RawLocationModule')` is at the top of relevant files

## Advanced Usage

### Getting Current Speed in Other Scripts

```typescript
@component
export class MyScript extends BaseScriptComponent {
  @input
  private speedController: SpeedDisplaySimpleController;
  
  onStart() {
    const currentSpeed = this.speedController.getCurrentSpeed();
    print(`Current speed: ${currentSpeed} mph`);
  }
}
```

### Hiding/Showing Speed Display

```typescript
// Hide speed display
this.speedController.setVisible(false);

// Show speed display
this.speedController.setVisible(true);
```

## Next Steps

1. **Test the basic setup** to ensure speed display works
2. **Customize the appearance** by modifying SpeedDisplaySimple.prefab
3. **Add additional features** as needed for your specific use case
