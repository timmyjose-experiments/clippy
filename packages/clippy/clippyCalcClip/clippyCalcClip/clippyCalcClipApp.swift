//
//  clippyCalcClipApp.swift
//  clippyCalcClip
//
//  Created by Timmy Jose on 27/12/24.
//

import SwiftUI

enum AppViewState {
    case helloworld
    case holamundo
    case calculator
    case unknown
}

@main
struct clippyCalcClipApp: App {
    @State private var appViewState: AppViewState = .unknown
    
    var body: some Scene {
        WindowGroup {
            ContentView(appViewState: $appViewState)
        }
    }
}
