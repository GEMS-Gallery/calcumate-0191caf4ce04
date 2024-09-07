import Error "mo:base/Error";

import Float "mo:base/Float";
import Debug "mo:base/Debug";

actor Calculator {
  public func add(x : Float, y : Float) : async Float {
    return x + y;
  };

  public func subtract(x : Float, y : Float) : async Float {
    return x - y;
  };

  public func multiply(x : Float, y : Float) : async Float {
    return x * y;
  };

  public func divide(x : Float, y : Float) : async ?Float {
    if (y == 0) {
      Debug.print("Error: Division by zero");
      return null;
    };
    return ?(x / y);
  };
}