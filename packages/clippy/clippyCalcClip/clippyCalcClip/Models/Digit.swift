//
//  Digit.swift
//  clippyCalcClip
//
//  Created by Timmy Jose on 27/12/24.
//

import Foundation

enum Digit: Int, CaseIterable, CustomStringConvertible {
    case zero, one, two, three, four, five, six, seven, eight, nine
    
    var description: String {
        "\(rawValue)"
    }
}
