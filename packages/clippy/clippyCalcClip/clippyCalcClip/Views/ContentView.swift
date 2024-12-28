//
//  ContentView.swift
//  clippyCalcClip
//
//  Created by Timmy Jose on 28/12/24.
//

import SwiftUI

struct ContentView: View {
    @Binding var appViewState: AppViewState
    
    var body: some View {
        Group {
            switch appViewState {
            case .helloworld:
                HelloWorldView()
            case .holamundo:
                HolaMundoView()
            case .calculator:
                CalculatorView()
                    .environmentObject(CalculatorView.ViewModel())
            case .unknown:
                UnknownView()
            }
        }.onContinueUserActivity(NSUserActivityTypeBrowsingWeb, perform: handleUserActivity(_:))
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

        // get access to UserDefaults, if possible
         guard let sharedUserDefaults = UserDefaults(suiteName: "group.com.timmyjose.clippy") else {
           print("Unable to get a handle to UserDefaults in App Clip")
           return
         }
          
        // store the invocation URL in the UserDefaults, if possible
        let invocationURLStr = invocationURL.absoluteString
        sharedUserDefaults.set(invocationURLStr, forKey: "invocationURL")
        sharedUserDefaults.synchronize()
        print("Saved \(invocationURLStr) to UserDefaults")
        
        // dispatch to the correct view
        let path = invocationURL.path
        if path.hasPrefix("/hello") {
            appViewState = .helloworld
        } else if path.hasPrefix("/hola") {
            appViewState = .holamundo
        } else if path.hasPrefix("/calc") {
            appViewState = .calculator
        } else {
            appViewState = .unknown
        }
    }
}
