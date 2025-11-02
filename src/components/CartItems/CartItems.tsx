import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { CartItem } from "~/models/CartItem";
import { formatAsPrice } from "~/utils/utils";
import AddProductToCart from "~/components/AddProductToCart/AddProductToCart";

type CartItemsProps = {
  items: CartItem[];
  isEditable: boolean;
};

export default function CartItems({ items, isEditable }: CartItemsProps) {
  const totalCount: number = items.reduce(
    (total, item) => item.count * item.count + total,
    0
  );

  return (
    <>
      <List disablePadding>
        {items.map((cartItem: CartItem) => (
          <ListItem
            sx={{ padding: (theme) => theme.spacing(1, 0) }}
            key={cartItem.product_id}
          >
            {isEditable && <AddProductToCart {...cartItem} />}
            <ListItemText
              primary={cartItem.id}
              secondary={cartItem.product_id}
            />
            <Typography variant="body2">
              {formatAsPrice(cartItem.count)}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ padding: (theme) => theme.spacing(1, 0) }}>
          <ListItemText primary="Shipping" />
          <Typography variant="body2">Free</Typography>
        </ListItem>
        <ListItem sx={{ padding: (theme) => theme.spacing(1, 0) }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {formatAsPrice(totalCount)}
          </Typography>
        </ListItem>
      </List>
    </>
  );
}
