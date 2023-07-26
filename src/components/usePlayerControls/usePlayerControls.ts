import { useEffect, useState } from "react"

const moveFieldByKey = (key: string) =>
{
    const keys: { [name: string]: string } = {
        KeyW: "forward",
        KeyS: "backward",
        KeyA: "left",
        KeyD: "right",
        ShiftLeft: "speed"
    }
    return keys[key]
}

const usePlayerControls = () =>
{
    const [speed, setSpeed] = useState(0.2)
    const [movement, setMovement] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        jump: false,
        speed: speed,
        setspeed: setSpeed
    })
    useEffect(() =>
    {
        movement.speed = speed
    }, [speed])
    useEffect(() =>
    {
        const handleKeyDown = (e: KeyboardEvent) =>
        {
            switch (e.code)
            {
                case "KeyW": //forward
                case "KeyA": // left           
                case "KeyS": // backwards           
                case "KeyD": // right    
                case "Space": // jump                
                    setMovement((m) => ({
                        ...m,
                        [moveFieldByKey(e.code)]: true
                    }))
                    return;
                case "ShiftLeft":
                    setMovement((m) => ({
                        ...m,
                        [moveFieldByKey(e.code)]: speed * 3
                    }))
                    return;
                default: return;
            }
        }

        const handleKeyUp = (e: KeyboardEvent) =>
        {
            switch (e.code)
            {
                case "KeyW": //forward
                case "KeyA": // left           
                case "KeyS": // backwards           
                case "KeyD": // right    
                case "Space": // jump                
                    setMovement((m) => ({
                        ...m,
                        [moveFieldByKey(e.code)]: false
                    }))
                    return;
                case "ShiftLeft":
                    setMovement((m) => ({
                        ...m,
                        [moveFieldByKey(e.code)]: speed
                    }))
                    return;
                default: return;
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("keyup", handleKeyUp)

        return () =>
        {
            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener("keyup", handleKeyUp)
        }
    }, [])

    return movement
}

export default usePlayerControls