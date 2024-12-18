import SwiftUI

struct ContentView: View {
    var body: some View {
        CalculatorView().environmentObject(CalculatorView.ViewModel())
    }
}

#Preview {
    ContentView()
}
