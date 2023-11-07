import { memo } from "react";
function Content({count, onRun}) {
    {console.log('re-render')}
    return(
        <>
            <h1>hello content {count}</h1>
            <button onClick={onRun}>run</button>
        </>
        
    )
}
export default memo(Content);