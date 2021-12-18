import {Helmet} from "react-helmet";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

const ComicsPages = () => {
    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page discript list of our comic"
                    />
                <title>Page comic</title>
            </Helmet>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default ComicsPages;