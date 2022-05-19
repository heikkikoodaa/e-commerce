import './category-menu-item.styles.scss';

const CategoryMenuItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <div className="menu-item-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="menu-item-body">
        <h2>{title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  );
};

export default CategoryMenuItem;
