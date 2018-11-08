import { paths } from "../paths";
import { sets } from "../sets";
import { xforms } from "./xforms";
import { addSetsToBindings } from "./utils";

const name = "/touch/var/";

const leftButton = paths.device.leftOculusTouch.button;
const leftAxis = paths.device.leftOculusTouch.axis;
const leftPose = paths.device.leftOculusTouch.pose;
const rightButton = paths.device.rightOculusTouch.button;
const rightAxis = paths.device.rightOculusTouch.axis;
const rightPose = paths.device.rightOculusTouch.pose;

const scaledLeftJoyX = `${name}left/scaledJoyX`;
const scaledLeftJoyY = `${name}left/scaledJoyY`;
const rightGripFalling = "${name}right/GripFalling";
const rightTriggerFalling = `${name}right/TriggerFalling`;
const cursorDrop2 = `${name}right/cursorDrop2`;
const cursorDrop1 = `${name}right/cursorDrop1`;
const rightHandDrop2 = `${name}right/rightHandDrop2`;
const rightHandDrop1 = `${name}right/rightHandDrop1`;
const rightGripRising = `${name}right/GripRising`;
const rightTriggerRising = `${name}right/TriggerRising`;
const rightGripRisingGrab = `${name}right/grip/RisingGrab`;
const rightTriggerRisingGrab = `${name}right/trigger/RisingGrab`;
const leftGripRisingGrab = `${name}left/grip/RisingGrab`;
const leftTriggerRisingGrab = `${name}left/trigger/RisingGrab`;
const leftGripFalling = `${name}left/GripFalling`;
const leftGripRising = `${name}left/GripRising`;
const leftTriggerRising = `${name}left/TriggerRising`;
const leftTriggerFalling = `${name}left/TriggerFalling`;
const rightDpadNorth = `${name}rightDpad/north`;
const rightDpadSouth = `${name}rightDpad/south`;
const rightDpadEast = `${name}rightDpad/east`;
const rightDpadWest = `${name}rightDpad/west`;
const rightDpadCenter = `${name}rightDpad/center`;
const rightJoy = `${name}right/joy`;
const rightJoyY = `${name}right/joyY`;
const rightJoyYCursorMod = `${name}right/joyYCursorMod`;
const leftDpadNorth = `${name}leftDpad/north`;
const leftDpadSouth = `${name}leftDpad/south`;
const leftDpadEast = `${name}leftDpad/east`;
const leftDpadWest = `${name}leftDpad/west`;
const leftDpadCenter = `${name}leftDpad/center`;
const leftJoy = `${name}left/joy`;
const leftJoyY = `${name}left/joyY`;
const leftJoyYCursorMod = `${name}left/joyYCursorMod`;
const oculusTouchCharacterAcceleration = `${name}characterAcceleration`;
const keyboardCharacterAcceleration = "/var/keyboard/characterAcceleration";
const characterAcceleration = "/var/oculus-touch/nonNormalizedCharacterAcceleration";
const wasd_vec2 = "/var/keyboard/wasd_vec2";
const arrows_vec2 = "/var/keyboard/arrows_vec2";
const keyboardBoost = "/var/keyboard-oculus/boost";
const rightBoost = "/var/right-oculus/boost";
const leftBoost = "/var/left-oculus/boost";
const rightTouchSnapRight = `${name}/right/snap-right`;
const rightTouchSnapLeft = `${name}/right/snap-left`;
const keyboardSnapRight = `${name}/keyboard/snap-right`;
const keyboardSnapLeft = `${name}/keyboard/snap-left`;

const lowerButtons = `${name}buttons/lower`;

const ensureFrozenViaButtons = `${name}buttons/ensureFrozen`;
const ensureFrozenViaKeyboard = `${name}keyboard/ensureFrozen`;

const thawViaButtons = `${name}buttons/thaw`;
const thawViaKeyboard = `${name}keyboard/thaw`;

export const oculusTouchUserBindings = addSetsToBindings({
  [sets.global]: [
    {
      src: {
        value: leftButton("grip").pressed
      },
      dest: {
        value: paths.actions.leftHand.middleRingPinky
      },
      xform: xforms.copy,
      priority: 0
    },
    {
      src: [leftButton("x").touched, leftButton("y").touched, leftButton("thumbStick").touched],
      dest: {
        value: paths.actions.leftHand.thumb
      },
      xform: xforms.any
    },
    {
      src: { value: leftButton("trigger").pressed },
      dest: {
        value: paths.actions.leftHand.index
      },
      xform: xforms.copy
    },
    {
      src: {
        value: rightButton("grip").pressed
      },
      dest: {
        value: paths.actions.rightHand.middleRingPinky
      },
      xform: xforms.copy
    },
    {
      src: [rightButton("x").touched, rightButton("y").touched, rightButton("thumbStick").touched],
      dest: {
        value: paths.actions.rightHand.thumb
      },
      xform: xforms.any
    },
    {
      src: { value: rightButton("trigger").pressed },
      dest: {
        value: paths.actions.rightHand.index
      },
      xform: xforms.copy
    },
    {
      src: {
        value: paths.device.keyboard.key("b")
      },
      dest: {
        value: paths.actions.toggleScreenShare
      },
      xform: xforms.rising
    },
    {
      src: {
        x: leftAxis("joyX"),
        y: leftAxis("joyY")
      },
      dest: {
        value: leftJoy
      },
      xform: xforms.compose_vec2
    },
    {
      src: {
        value: leftJoy
      },
      dest: {
        north: leftDpadNorth,
        south: leftDpadSouth,
        east: leftDpadEast,
        west: leftDpadWest,
        center: leftDpadCenter
      },
      xform: xforms.vec2dpad(0.2, false, true)
    },
    {
      src: {
        x: rightAxis("joyX"),
        y: rightAxis("joyY")
      },
      dest: {
        value: rightJoy
      },
      xform: xforms.compose_vec2
    },
    {
      src: {
        value: rightJoy
      },
      dest: {
        north: rightDpadNorth,
        south: rightDpadSouth,
        east: rightDpadEast,
        west: rightDpadWest,
        center: rightDpadCenter
      },
      xform: xforms.vec2dpad(0.2, false, true)
    },
    {
      src: {
        value: rightDpadEast
      },
      dest: {
        value: rightTouchSnapRight
      },
      xform: xforms.rising,
      priority: 1
    },
    {
      src: { value: paths.device.keyboard.key("e") },
      dest: { value: keyboardSnapRight },
      xform: xforms.rising
    },
    {
      src: [rightTouchSnapRight, keyboardSnapRight],
      dest: { value: paths.actions.snapRotateRight },
      xform: xforms.any
    },
    {
      src: { value: paths.device.keyboard.key(" ") },
      dest: { value: ensureFrozenViaKeyboard },
      xform: xforms.copy
    },
    {
      src: [leftButton("x").pressed, rightButton("a").pressed],
      dest: { value: lowerButtons },
      xform: xforms.any
    },
    {
      src: { value: lowerButtons },
      dest: { value: ensureFrozenViaButtons },
      xform: xforms.copy,
      priority: 1
    },
    {
      src: { value: lowerButtons },
      dest: { value: thawViaButtons },
      xform: xforms.falling,
      priority: 1
    },
    {
      src: { value: paths.device.keyboard.key(" ") },
      dest: { value: thawViaKeyboard },
      xform: xforms.falling,
      priority: 1
    },
    {
      src: {
        value: rightDpadWest
      },
      dest: {
        value: rightTouchSnapLeft
      },
      xform: xforms.rising,
      priority: 1
    },
    {
      src: { value: paths.device.keyboard.key("q") },
      dest: { value: keyboardSnapLeft },
      xform: xforms.rising
    },
    {
      src: [rightTouchSnapLeft, keyboardSnapLeft],
      dest: { value: paths.actions.snapRotateLeft },
      xform: xforms.any
    },
    {
      src: {
        value: leftAxis("joyX")
      },
      dest: {
        value: scaledLeftJoyX
      },
      xform: xforms.scale(1.5) // horizontal character speed modifier
    },
    {
      src: {
        value: leftAxis("joyY")
      },
      dest: { value: scaledLeftJoyY },
      xform: xforms.scale(-1.5) // vertical character speed modifier
    },
    {
      src: {
        x: scaledLeftJoyX,
        y: scaledLeftJoyY
      },
      dest: { value: oculusTouchCharacterAcceleration },
      xform: xforms.compose_vec2
    },
    {
      src: {
        w: paths.device.keyboard.key("arrowup"),
        a: paths.device.keyboard.key("arrowleft"),
        s: paths.device.keyboard.key("arrowdown"),
        d: paths.device.keyboard.key("arrowright")
      },
      dest: { vec2: arrows_vec2 },
      xform: xforms.wasd_to_vec2
    },
    {
      src: {
        w: paths.device.keyboard.key("w"),
        a: paths.device.keyboard.key("a"),
        s: paths.device.keyboard.key("s"),
        d: paths.device.keyboard.key("d")
      },
      dest: { vec2: wasd_vec2 },
      xform: xforms.wasd_to_vec2
    },
    {
      src: {
        value: paths.device.keyboard.key("t")
      },
      dest: {
        value: paths.actions.focusChat
      },
      xform: xforms.rising
    },
    {
      src: {
        value: paths.device.keyboard.key("l")
      },
      dest: {
        value: paths.actions.logDebugFrame
      },
      xform: xforms.rising
    },
    {
      src: {
        value: paths.device.keyboard.key("m")
      },
      dest: {
        value: paths.actions.muteMic
      },
      xform: xforms.rising
    },
    {
      src: {
        first: wasd_vec2,
        second: arrows_vec2
      },
      dest: { value: keyboardCharacterAcceleration },
      xform: xforms.max_vec2
    },
    {
      src: {
        first: oculusTouchCharacterAcceleration,
        second: keyboardCharacterAcceleration
      },
      dest: {
        value: characterAcceleration
      },
      xform: xforms.max_vec2
    },
    {
      src: { value: characterAcceleration },
      dest: { value: paths.actions.characterAcceleration },
      xform: xforms.normalize_vec2
    },
    {
      src: { value: paths.device.keyboard.key("shift") },
      dest: { value: keyboardBoost },
      xform: xforms.copy
    },
    {
      src: {
        value: leftButton("y").pressed
      },
      dest: {
        value: leftBoost
      },
      xform: xforms.copy
    },
    {
      src: {
        value: rightButton("b").pressed
      },
      dest: {
        value: rightBoost
      },
      xform: xforms.copy
    },
    {
      src: [keyboardBoost, leftBoost, rightBoost],
      dest: { value: paths.actions.boost },
      xform: xforms.any
    },
    {
      src: { value: rightPose },
      dest: { value: paths.actions.cursor.pose },
      xform: xforms.copy
    },
    {
      src: { value: rightPose },
      dest: { value: paths.actions.rightHand.pose },
      xform: xforms.copy
    },
    {
      src: { value: leftPose },
      dest: { value: paths.actions.leftHand.pose },
      xform: xforms.copy
    },
    {
      src: { value: rightButton("trigger").pressed },
      dest: { value: paths.actions.rightHand.stopTeleport },
      xform: xforms.falling,
      priority: 1
    },
    {
      src: { value: leftButton("trigger").pressed },
      dest: { value: paths.actions.leftHand.stopTeleport },
      xform: xforms.falling,
      priority: 1
    }
  ],

  [sets.leftHandHoveringOnNothing]: [
    {
      src: { value: leftButton("trigger").pressed },
      dest: { value: paths.actions.leftHand.startTeleport },
      xform: xforms.rising,
      priority: 1
    }
  ],

  [sets.cursorHoveringOnUI]: [
    {
      src: { value: rightButton("trigger").pressed },
      dest: { value: paths.actions.cursor.grab },
      xform: xforms.rising,
      priority: 1
    }
  ],

  [sets.cursorHoveringOnNothing]: [
    {
      src: { value: rightButton("trigger").pressed },
      dest: { value: paths.actions.rightHand.startTeleport },
      xform: xforms.rising,
      priority: 1
    }
  ],

  [sets.leftHandHoveringOnInteractable]: [
    {
      src: { value: leftButton("grip").pressed },
      dest: { value: leftGripRisingGrab },
      xform: xforms.rising,
      priority: 2
    },
    {
      src: { value: leftButton("trigger").pressed },
      dest: { value: leftTriggerRisingGrab },
      xform: xforms.rising,
      priority: 2
    },
    {
      src: [leftGripRisingGrab, leftTriggerRisingGrab],
      dest: { value: paths.actions.leftHand.grab },
      xform: xforms.any,
      priority: 2
    }
  ],

  [sets.leftHandHoldingInteractable]: [
    {
      src: { value: leftButton("grip").pressed },
      dest: { value: paths.actions.leftHand.drop },
      xform: xforms.falling,
      priority: 2
    },
    {
      src: {},
      dest: { value: ensureFrozenViaButtons },
      priority: 1,
      xform: xforms.always(false)
    }
  ],

  [sets.leftHandHoveringOnPen]: [],
  [sets.leftHandHoldingPen]: [
    {
      src: { value: leftButton("trigger").pressed },
      dest: { value: paths.actions.leftHand.startDrawing },
      xform: xforms.rising,
      priority: 3
    },
    {
      src: { value: leftButton("trigger").pressed },
      dest: { value: paths.actions.leftHand.stopDrawing },
      xform: xforms.falling,
      priority: 3
    },
    {
      src: {
        value: leftDpadEast
      },
      dest: {
        value: paths.actions.leftHand.penNextColor
      },
      xform: xforms.rising,
      priority: 2
    },
    {
      src: {
        value: leftDpadWest
      },
      dest: {
        value: paths.actions.leftHand.penPrevColor
      },
      xform: xforms.rising,
      priority: 2
    },
    {
      src: {
        bool: leftButton("grip").pressed,
        value: leftAxis("joyY")
      },
      dest: { value: leftJoyY },
      xform: xforms.copyIfTrue,
      priority: 1
    },
    {
      src: { value: leftJoyY },
      dest: { value: paths.actions.leftHand.scalePenTip },
      xform: xforms.scale(-0.01),
      priority: 1
    },
    {
      src: {
        bool: leftButton("grip").pressed,
        value: leftAxis("joyY")
      },
      dest: { value: leftJoyYCursorMod },
      xform: xforms.copyIfFalse,
      priority: 1
    }
  ],

  [sets.cursorHoveringOnInteractable]: [
    {
      src: { value: rightButton("grip").pressed },
      dest: { value: rightGripRisingGrab },
      xform: xforms.rising,
      priority: 2
    },
    {
      src: { value: rightButton("trigger").pressed },
      dest: { value: rightTriggerRisingGrab },
      xform: xforms.rising,
      priority: 2
    },
    {
      src: [rightGripRisingGrab, rightTriggerRisingGrab],
      dest: { value: paths.actions.cursor.grab },
      xform: xforms.any,
      priority: 2
    }
  ],

  [sets.cursorHoldingInteractable]: [
    {
      src: { value: rightAxis("joyY") },
      dest: { value: paths.actions.cursor.modDelta },
      xform: xforms.scale(0.1)
    },
    {
      src: { value: rightButton("grip").pressed },
      dest: { value: cursorDrop1 },
      xform: xforms.falling,
      priority: 2
    },
    {
      src: { value: rightButton("trigger").pressed },
      dest: {
        value: cursorDrop2
      },
      xform: xforms.falling,
      priority: 2
    },
    {
      src: [cursorDrop1, cursorDrop2],
      dest: { value: paths.actions.cursor.drop },
      xform: xforms.any,
      priority: 2
    },
    {
      src: {},
      dest: { value: ensureFrozenViaButtons },
      priority: 1,
      xform: xforms.always(false)
    }
  ],

  [sets.cursorHoveringOnPen]: [],

  [sets.cursorHoldingPen]: [
    {
      src: { value: rightButton("trigger").pressed },
      dest: { value: paths.actions.cursor.startDrawing },
      xform: xforms.rising,
      priority: 3
    },
    {
      src: { value: rightButton("trigger").pressed },
      dest: { value: paths.actions.cursor.stopDrawing },
      xform: xforms.falling,
      priority: 3
    }
  ],

  [sets.rightHandHoveringOnInteractable]: [
    {
      src: { value: rightButton("grip").pressed },
      dest: { value: rightGripRisingGrab },
      xform: xforms.rising,
      priority: 2
    },
    {
      src: { value: rightButton("trigger").pressed },
      dest: { value: rightTriggerRisingGrab },
      xform: xforms.rising,
      priority: 2
    },
    {
      src: [rightGripRisingGrab, rightTriggerRisingGrab],
      dest: { value: paths.actions.rightHand.grab },
      xform: xforms.any,
      priority: 2
    }
  ],

  [sets.rightHandHoldingInteractable]: [
    {
      src: { value: rightButton("grip").pressed },
      dest: { value: rightHandDrop1 },
      xform: xforms.falling,
      priority: 2
    },
    {
      src: { value: rightButton("trigger").pressed },
      dest: {
        value: rightHandDrop2
      },
      xform: xforms.falling,
      priority: 2
    },
    {
      src: [rightHandDrop1, rightHandDrop2],
      dest: { value: paths.actions.rightHand.drop },
      xform: xforms.any,
      priority: 2
    },
    {
      src: {},
      dest: { value: ensureFrozenViaButtons },
      priority: 1,
      xform: xforms.always(false)
    }
  ],
  [sets.rightHandHoveringOnPen]: [],
  [sets.rightHandHoldingPen]: [
    {
      src: { value: rightButton("trigger").pressed },
      dest: { value: paths.actions.rightHand.startDrawing },
      xform: xforms.rising,
      priority: 3
    },
    {
      src: { value: rightButton("trigger").pressed },
      dest: { value: paths.actions.rightHand.stopDrawing },
      xform: xforms.falling,
      priority: 3
    },
    {
      src: {
        value: rightDpadEast
      },
      dest: {
        value: paths.actions.rightHand.penNextColor
      },
      xform: xforms.rising,
      priority: 2
    },
    {
      src: {
        value: rightDpadWest
      },
      dest: {
        value: paths.actions.rightHand.penPrevColor
      },
      xform: xforms.rising,
      priority: 2
    },
    {
      src: {
        bool: rightButton("grip").pressed,
        value: rightAxis("joyY")
      },
      dest: { value: rightJoyY },
      xform: xforms.copyIfTrue,
      priority: 2
    },
    {
      src: { value: rightJoyY },
      dest: { value: paths.actions.rightHand.scalePenTip },
      xform: xforms.scale(-0.01),
      priority: 2
    },
    {
      src: {
        boo: rightButton("grip").pressed,
        value: rightAxis("joyY")
      },
      dest: { value: rightJoyYCursorMod },
      xform: xforms.copyIfFalse,
      priority: 2
    }
  ],

  [sets.cursorHoveringOnCamera]: [],
  [sets.rightHandHoveringOnCamera]: [],
  [sets.leftHandHoveringOnCamera]: [],

  [sets.rightHandHoldingCamera]: [
    {
      src: { value: rightButton("trigger").pressed },
      dest: { value: paths.actions.rightHand.takeSnapshot },
      xform: xforms.rising
    },
    {
      src: { value: rightButton("trigger").pressed },
      dest: { value: paths.noop },
      xform: xforms.falling,
      priority: 4
    }
  ],
  [sets.leftHandHoldingCamera]: [
    {
      src: { value: leftButton("trigger").pressed },
      dest: { value: paths.actions.leftHand.takeSnapshot },
      xform: xforms.rising,
      priority: 4
    }
  ],
  [sets.cursorHoldingCamera]: [
    {
      src: { value: rightButton("trigger").pressed },
      dest: { value: paths.actions.cursor.takeSnapshot },
      xform: xforms.rising
    },
    {
      src: { value: rightButton("trigger").pressed },
      dest: { value: paths.noop },
      xform: xforms.falling,
      priority: 4
    }
  ],

  [sets.rightHandHoveringOnNothing]: [],
  [sets.globalPost]: [
    {
      src: [ensureFrozenViaButtons, ensureFrozenViaKeyboard],
      dest: { value: paths.actions.ensureFrozen },
      xform: xforms.any
    },
    {
      src: [thawViaButtons, thawViaKeyboard],
      dest: { value: paths.actions.thaw },
      xform: xforms.any
    }
  ]
});
