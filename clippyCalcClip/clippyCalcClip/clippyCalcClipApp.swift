//
//  clippyCalcClipApp.swift
//  clippyCalcClip
//
//  Created by Timmy Jose on 27/12/24.
//

import SwiftUI

@main
struct clippyCalcClipApp: App {
    var body: some Scene {
        WindowGroup {
            CalculatorView()
                .environmentObject(CalculatorView.ViewModel())
        }
    }
}