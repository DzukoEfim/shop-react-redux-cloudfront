import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { formatAsPrice } from "~/utils/utils";
import AddProductToCart from "~/components/AddProductToCart/AddProductToCart";
import { useAvailableProduct } from "~/queries/products";
import { useParams } from "react-router-dom";

export default function SingleProduct() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useAvailableProduct(id);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!isLoading && !data) {
    return <>Product was not found...</>;
  }

  return (
    <Grid container spacing={4}>
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
      <Grid item key={data?.id} xs={12} sm={12} md={12}>
        <Card>
          <CardMedia
            sx={{ pt: "56.25%" }}
            image={`https://picsum.photos/id/${data?.id?.match(/\d/g)}/800/800`}
            title="Image title"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {data?.title}
            </Typography>
            <Typography gutterBottom variant="h6" component="h3">
              {data?.description}
            </Typography>
            <Typography>Count: {data.count}</Typography>
            <Typography>{formatAsPrice(data?.price ?? 0)}</Typography>
          </CardContent>
          {!!data && (
            <CardActions>
              <AddProductToCart product={data} />
            </CardActions>
          )}
        </Card>
      </Grid>
    </Grid>
  );
}
