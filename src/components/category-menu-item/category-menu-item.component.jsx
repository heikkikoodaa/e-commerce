import { useNavigate } from 'react-router-dom';

import {
  BackgroundImage,
  Body,
  MenuItemContainer,
} from './category-menu-item.styles';

const CategoryMenuItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <MenuItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </MenuItemContainer>
  );
};

export default CategoryMenuItem;
