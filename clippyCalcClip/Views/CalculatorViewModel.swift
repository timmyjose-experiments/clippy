import Foundation
import Combine

extension CalculatorView {
    final class ViewModel: ObservableObject {
        
        @Published var activityCount = 0
        @Published var showUpgradePrompt = false

        // MARK: - PROPERTIES
        
        @Published private var calculator = Calculator()
        
        var displayText: String {
            return calculator.displayText
        }
        
        var buttonTypes: [[ButtonType]] {
            let clearType: ButtonType = calculator.showAllClear ? .allClear : .clear
            return [
                [clearType, .negative, .percent, .operation(.division)],
                [.digit(.seven), .digit(.eight), .digit(.nine), .operation(.multiplication)],
                [.digit(.four), .digit(.five), .digit(.six), .operation(.subtraction)],
                [.digit(.one), .digit(.two), .digit(.three), .operation(.addition)],
                [.digit(.zero), .decimal, .equals]
            ]
        }
        
        // MARK: - ACTIONS
        
        func performAction(for buttonType: ButtonType) {
            switch buttonType {
            case .digit(let digit):
                calculator.setDigit(digit)
            case .operation(let operation):
                calculator.setOperation(operation)
            case .negative:
                calculator.toggleSign()
            case .percent:
                calculator.setPercent()
            case .decimal:
                calculator.setDecimal()
            case .equals:
                calculator.evaluate()
            case .allClear:
                calculator.allClear()
            case .clear:
                calculator.clear()
            }

            // update the activity count
            activityCount += 1

            // some random condition to trigger the prompt to update
            // to the full app
            if activityCount >= 25 {
                showUpgradePrompt = true
            }
        }
        
        // MARK: - HELPERS
        
        /// Checks if current buttonType of type .arithmeticOperation is active
        func buttonTypeIsHighlighted(buttonType: ButtonType) -> Bool {
            guard case .operation(let operation) = buttonType else { return false}
            return calculator.operationIsHighlighted(operation)
        }
    }
}
