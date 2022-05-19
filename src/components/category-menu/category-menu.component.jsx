import CategoryMenuItem from '../category-menu-item/category-menu-item.component';

import { Categories } from './category-menu.styles';

const CategoryMenu = ({ categories }) => {
  return (
    <Categories>
      {categories.map((category) => (
        <CategoryMenuItem key={category.id} category={category} />
      ))}
    </Categories>
  );
};

export default CategoryMenu;
