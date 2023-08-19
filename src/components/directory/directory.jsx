import CategoryItem from '../category-item/CategoryItem'
import './directory-style.scss';

const Directory = ({categories}) => {
    return (
    <div className="directory-container">
        {
            categories.map((category) => {
            return (
                <CategoryItem category={category} key={category.id}/>
            )
            })
        }
    </div>
    );
}

export default Directory