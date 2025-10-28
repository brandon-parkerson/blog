import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Article() {
    const {id} = useParams();
    const URL = `http://localhost:3000/api/posts/${id}`
    useEffect(() => {
        try {
            async function getPost() {
                const response = await fetch("")
            }
        } catch (error) {
            console.log(error);
        }
    })
    return (
        <>
            <h1>Article</h1>
            <p>content of: {id}</p>
	
            <Link to={"/posts"}>Home</Link>
        </>
        
        
    )
}

export default Article;
