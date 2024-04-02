import ItemCollapse from "../pages/Calculator/components/item-collapse/itemCollapse";
import { useState } from "react";

export default {
  component: ItemCollapse,
};

const Template = (args) => {
  const [items, setItems] = useState([]);

  const handleDeleteItem = (index) => {
    let newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <ItemCollapse
      {...args}
      items={items}
      setItems={setItems}
      handleDeleteItem={handleDeleteItem}
    />
  );
};

export const Primary = Template.bind({});
