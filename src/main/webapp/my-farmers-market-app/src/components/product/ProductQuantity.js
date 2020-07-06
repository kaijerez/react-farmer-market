import React from "react"

export default function ProductQuantity(props) {
    return (
        <div>
            Quantity: <input style={{ width: "50px" }} name="quantity" min="1" type="number" step="1" className="inputne" value={props.count} />
        </div>
    )
}