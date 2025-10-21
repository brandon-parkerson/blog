import { useParams } from "react-router-dom";
function Article() {
    const {id} = useParams();
    return (
        <>
            <h1>Article</h1>
            <p>content of: {id}</p>
        </>
        
        
    )
}

export default Article;
