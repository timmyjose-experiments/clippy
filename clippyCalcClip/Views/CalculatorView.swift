import SwiftUI
import StoreKit

struct CalculatorView: View {
    
    @EnvironmentObject private var viewModel: ViewModel
    
    var body: some View {
        VStack {
            Text("(Running inside an app clip)")
                .onContinueUserActivity(NSUserActivityTypeBrowsingWeb, perform: handleUserActivity(_:))

            Spacer()
            displayText
            buttonPad
        }
        .padding(Constants.padding)
        .background(Color.black)
        .appStoreOverlay(isPresented: $viewModel.showUpgradePrompt) {
            SKOverlay.AppClipConfiguration(position: .bottom)
        }
    }

    // This is where the incoming link, which can be of different forms, built upon the
    // "Advanced App Clip Experience Url" configured in AppStore Connect can be parsed,
    // and handled accordingly.
    //
    // For instance, we could have urls such as:
    //
    // https://full-sheep-careful.ngrok-free.app (the base experience domain url)
    // https://full-sheep-careful.ngrok-free.app/qr-code-handler?p=12345 etc. (longer payloads possible in QR Code)
    // https://full-sheep-careful.ngrok-free.app/appclip (smaller payloads in AppClip Code)
    // etc.
    //
    // In all these, the "base" url is the same as that registered in AppStoreConnect.
    private func handleUserActivity(_ activity: NSUserActivity?) {
        guard let activity, activity.activityType == NSUserActivityTypeBrowsingWeb else { return }
        guard let invocationURL = activity.webpageURL else { return }
        print("Invocation URL = \(invocationURL)")
    }
}

struct CalculatorView_Previews: PreviewProvider {
    static var previews: some View {
        CalculatorView()
            .environmentObject(CalculatorView.ViewModel())
    }
}

extension CalculatorView {
    
    private var displayText: some View {
        Text(viewModel.displayText)
            .padding()
            .foregroundColor(.white)
            .frame(maxWidth: .infinity, alignment: .trailing)
            .font(.system(size: 88, weight: .light))
            .lineLimit(1)
            .minimumScaleFactor(0.2)
    }
    
    private var buttonPad: some View {
        VStack(spacing: Constants.padding) {
            ForEach(viewModel.buttonTypes, id: \.self) { row in
                HStack(spacing: Constants.padding) {
                    ForEach(row, id: \.self) { buttonType in
                        CalculatorButton(buttonType: buttonType)
                    }
                }
            }
        }
    }
}
