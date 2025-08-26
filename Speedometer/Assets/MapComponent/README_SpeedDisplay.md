# Speed Display for MapComponent

This update adds speed tracking and display functionality to the MapComponent, allowing users to see their current speed in miles per hour while using the map.

## New Components

### 1. SpeedDisplay Component
- **File**: `Assets/MapComponent/Scripts/SpeedDisplay.ts`
- **Purpose**: Calculates and displays the user's current speed based on GPS position changes
- **Features**:
  - Real-time speed calculation using Haversine formula
  - Speed displayed in miles per hour (mph)
  - Configurable update interval
  - Automatic text display updates

### 2. SpeedDisplayController Component
- **File**: `Assets/MapComponent/Scripts/SpeedDisplayController.ts`
- **Purpose**: Manages the integration between MapComponent and SpeedDisplay
- **Features**:
  - Automatic setup of speed display
  - Public methods for speed access and visibility control
  - Error handling and logging

### 3. SpeedDisplay Prefab
- **File**: `Assets/MapComponent/Prefabs/SpeedDisplay.prefab`
- **Purpose**: UI prefab for displaying speed information
- **Features**:
  - Positioned in top-right corner of screen
  - White text with 24pt font size
  - High render order (100) to ensure visibility

## Setup Instructions

### 1. Add SpeedDisplay to Your Scene

1. **Create a SceneObject** to hold the speed display
2. **Add the SpeedDisplayController component** to this SceneObject
3. **Configure the inputs**:
   - `mapComponent`: Reference to your MapComponent
   - `speedDisplayPrefab`: Reference to the SpeedDisplay.prefab
   - `speedDisplayParent`: Parent SceneObject for the speed display

### 2. Example Scene Setup

```
Scene Hierarchy:
├── MapComponent
├── SpeedDisplayContainer (with SpeedDisplayController)
└── Other UI elements
```

### 3. Component Configuration

The SpeedDisplayController will automatically:
- Instantiate the speed display prefab
- Connect it to the MapComponent
- Set up the text display
- Begin tracking user speed

## How It Works

### Speed Calculation
1. **GPS Tracking**: Monitors user location updates from the MapComponent
2. **Distance Calculation**: Uses Haversine formula to calculate distance between consecutive GPS points
3. **Speed Computation**: Converts distance and time to miles per hour
4. **Display Update**: Updates the UI text every 0.5 seconds (configurable)

### Map Following
- The MapComponent now **automatically follows the user** by default
- The map centers on the user's current location
- Users can still manually scroll the map, but it will return to following mode when recentered

## API Reference

### SpeedDisplay Methods
```typescript
getCurrentSpeed(): number  // Returns current speed in mph
```

### SpeedDisplayController Methods
```typescript
getCurrentSpeed(): number           // Returns current speed in mph
setSpeedDisplayVisible(visible: boolean)  // Show/hide speed display
```

### MapComponent New Methods
```typescript
getUserSpeed(): number  // Returns user's current speed in mph
```

## Customization

### Update Interval
Modify the `updateInterval` property in SpeedDisplay to change how frequently speed updates:
```typescript
@input
private updateInterval: number = 0.5; // Update every 0.5 seconds
```

### Display Position
Adjust the anchor and offset values in the SpeedDisplay.prefab to reposition the speed display:
```yaml
Anchor:
  left: 0.800000    # Right side of screen
  bottom: 0.800000  # Top portion of screen
  right: 0.950000
  top: 0.900000
```

### Text Styling
Modify the Text component properties in the prefab to change:
- Font size
- Text color
- Background settings
- Shadow effects

## Troubleshooting

### Speed Display Not Showing
1. Check that SpeedDisplayController has all required inputs set
2. Verify the MapComponent is properly initialized
3. Check console for error messages

### Speed Always Shows 0.0 mph
1. Ensure GPS permissions are granted
2. Check that user is moving (speed calculation requires movement)
3. Verify location updates are being received

### Map Not Following User
1. Check that `shouldFollowMapLocation` is true in MapController
2. Ensure the map hasn't been manually scrolled
3. Call `centerMap()` to return to following mode

## Performance Considerations

- Speed calculation uses efficient Haversine formula
- Updates are limited to configurable intervals to prevent excessive calculations
- Text updates only occur when speed values change
- GPS accuracy affects speed calculation precision

## Future Enhancements

Potential improvements could include:
- Speed averaging over longer time periods
- Speed history graphs
- Speed-based alerts or notifications
- Integration with fitness tracking features
- Support for different speed units (km/h, m/s)
