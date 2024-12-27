import ExpoModulesCore
import os

public class UserDefaultsSuiteIosModule: Module {
  private let subsystem = Bundle.main.bundleIdentifier ?? "com.timmyjose.datasharingdemo"
  private lazy var logger = OSLog(subsystem: subsystem, category: "UserDefaultsSuiteIosModule")

  public func definition() -> ModuleDefinition {
    Name("UserDefaultsSuiteIos")

    Function("get") { (suite: String, key: String) -> String? in
      guard let sharedUserDefaults = UserDefaults(suiteName: suite) else { 
        os_log("Could not get UserDefaults for suite: %@", log: logger, type: .error, suite)
        return nil
      }

      if let savedValue = sharedUserDefaults.string(forKey: key) {
        os_log("Got a saved value for key: %@, value: %@", log: logger, type: .info, key, savedValue)
        return savedValue
      } else {
        os_log("Didn't find a saved value for key: %@", log: logger, type: .info, key)
      }
      return nil
    }
  }
}