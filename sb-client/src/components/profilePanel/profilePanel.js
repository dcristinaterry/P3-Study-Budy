import React from "react";
import Avatar from "../avatar/avatar"

function Profile() {
    const [state, dispatch] = useStoreContext()

    return (
        <div className="col-sm-2">
            <div className="row">
                <Avatar />
            </div>
            <div className="row">
                {state.classes.map((item, index) => (
                    <div>
                    <button className="btn btn-light ml-3 border-dark" onClick={() => AllSessions(classid)}>
                        {state.classid, state.name, state.age}
                    </button>
                    </div>
                ))}
                
                <button className="btn btn-light ml-3 border-dark" onClick={props.class2}>
                    Class 2
                </button>
                <br />
                <button className="btn btn-light ml-3 border-dark" onClick={props.class3}>
                    Class 3
                </button>
                <br />
                <button className="btn btn-light ml-3 border-dark" onClick={props.class4}>
                    Class 4
                </button>
            </div>
        </div>
    )
}

export default Profile