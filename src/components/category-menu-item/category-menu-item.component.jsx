import {
  BackgroundImage,
  Body,
  MenuItemContainer,
} from './category-menu-item.styles';

const CategoryMenuItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <MenuItemContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </MenuItemContainer>
  );
};

export default CategoryMenuItem;
