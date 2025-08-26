@component
export class SpeedDisplayTest extends BaseScriptComponent {
  
  onAwake() {
    print("SpeedDisplayTest: Script is running!");
    
    // Simple test - just print to console every second
    this.createEvent("UpdateEvent").bind(() => {
      if (getTime() % 1 < 0.1) {
        print(`SpeedDisplayTest: Time = ${getTime().toFixed(1)}`);
      }
    });
  }
}