//
//  ContentView.swift
//  clippyClip
//
//  Created by Timmy Jose on 16/12/24.
//

import SwiftUI
import StoreKit

struct ContentView: View {
  var activities = ["Archery", "Baseball"]
  @State private var selectedActivity = "Archery"
  
  @State private var activityCount = 0
  @State private var showUpgradePrompt = false
  
  var colors: [Color] = [.blue, .orange]
  
  @State private var id = 1
  
  var body: some View {
      VStack {
          Spacer()
          
          Text("(Running inside an app clip)")
              .font(.title3)
              .onContinueUserActivity(NSUserActivityTypeBrowsingWeb, perform: handleUserActivity(_:))
          
          Text("Why not try...")
              .font(.largeTitle.bold())
          
          
          VStack {
              Circle()
                  .fill(colors.randomElement() ?? .blue)
                  .padding()
                  .overlay(
                      Image(systemName: "figure.\(selectedActivity.lowercased())")
                          .font(.system(size: 144))
                          .foregroundColor(.white)
                  )
              
              Text("\(selectedActivity)!")
                  .font(.title)
          }
          .transition(.slide)
          .id(id)
          
          Spacer()
          
          Button("Try again") {
              withAnimation(.easeInOut(duration: 1)) {
                  selectedActivity = activities.randomElement() ?? "Archery"
                  id += 1
                  
                  activityCount += 1
                  
                  if activityCount >= 5 {
                      showUpgradePrompt = true
                  }
              }
          }
          .buttonStyle(.borderedProminent)
          
          Spacer()
          
      }.appStoreOverlay(isPresented: $showUpgradePrompt) {
        SKOverlay.AppClipConfiguration(position: .bottom)
      }
  }
  
  private func handleUserActivity(_ activity: NSUserActivity?) {
      guard let activity, activity.activityType == NSUserActivityTypeBrowsingWeb else { return }
      guard let invocationURL = activity.webpageURL else { return }
      print("invocation URL = \(invocationURL)")
  }
}

#Preview {
    ContentView()
}
