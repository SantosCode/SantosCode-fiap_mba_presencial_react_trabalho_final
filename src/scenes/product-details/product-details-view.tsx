import {
  FavoriteBorder,
  FavoriteOutlined
} from '@mui/icons-material';
import {
  CircularProgress, Grid, IconButton, Snackbar, Tooltip, Typography
} from "@mui/material";
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import { Component, ReactElement } from 'react';
import { Routes } from '../../../utils/routes';
import HeaderView from '../../components/header/header-view';
import { currency } from '../../helpers/currency';
import { ProductDetails } from '../../models/product-details';
import { User } from '../../models/user';
import { styles } from "./product-details-view.styles";

interface Props {
  productDetails?: ProductDetails;
  google: any;
  geolocationPositions?: GeolocationPosition;
  hasPermission: boolean;
  handleFavoriteButtonClick: () => Promise<void>;
  isFavLoading: boolean;
  isSnackbarOpen: boolean;
  closeSnackbar: () => void;
  user?: User;
}

interface State {
  openInfoWindowIndex?: number
}

class ProductDetailsView extends Component<Props, State> {
  state = {
    openInfoWindowIndex: undefined
  }

  private renderInfo = (): ReactElement | null => {
    const { openInfoWindowIndex } = this.state;
    const { productDetails } = this.props;

    if (openInfoWindowIndex === undefined) {
      return null
    }

    const selectedStore = productDetails?.product.stores[openInfoWindowIndex];

    return (
      <div style={styles.storeContainer}>
        <Typography variant="h5">Loja:</Typography>
        <Typography variant="subtitle1">{selectedStore?.name}</Typography>
        <Typography variant="subtitle1">{selectedStore?.address}</Typography>
      </div>
    )
  }

  private handleMarkerClick = (index: number) => () => {
    this.setState({ openInfoWindowIndex: index })
  }

  private renderFavButton = (): ReactElement => {
    const { isFavLoading, productDetails } = this.props;

    if (isFavLoading) {
      return (
        <CircularProgress color="secondary" size={24} />
      )
    }

    if (productDetails?.product.isFavorite) {
      return (
        <FavoriteOutlined fontSize="large" color="secondary" />
      )
    }

    return (
      <FavoriteBorder fontSize="large" />
    )
  }

  public render(): ReactElement {
    const {
      productDetails,
      google,
      geolocationPositions,
      hasPermission,
      handleFavoriteButtonClick,
      isSnackbarOpen,
      closeSnackbar,
      user
    } = this.props;

    return (
      <>
        <HeaderView
          userName={user?.name}
          currentRoute={Routes.DETAILS}
          title="Detalhes"
        />
        <Grid
          container
          height="100%"
          width="100%"
        >
          <Grid
            item
            xs={6}
            height="100vh"
            width="100%"
            alignItems="flex-start"
            justifyContent="center"
            padding={5}
          >
            <div>
              <Typography variant="h5">{productDetails?.product.name}</Typography>
              <Typography variant="h6">{currency.format(productDetails?.product.price || 0)}</Typography>
              <Tooltip title={`Clique para ${productDetails?.product.isFavorite ? "Desfavoritar" : "Favoritar"}`}>
                <IconButton onClick={handleFavoriteButtonClick}>
                  {this.renderFavButton()}
                </IconButton>
              </Tooltip>
            </div>
            {this.renderInfo()}
          </Grid>
          <Grid
            item
            xs={6}
            height="100vh"
            width="100%"
            alignItems="flex-start"
            justifyContent="flex-start"
            direction="column"
            padding={5}
          >
            <Typography variant="h5">Onde encontrar:</Typography>
            {!hasPermission && <Typography variant="caption" color="error">Não foi possível buscar sua localização</Typography>}
            {geolocationPositions !== undefined && (
              <Map
                google={google}
                style={{
                  position: "relative",
                  width: "40%",
                  height: "70%",
                }}
                initialCenter={{
                  lat: geolocationPositions.coords.latitude,
                  lng: geolocationPositions.coords.longitude
                }}
                // @ts-ignore
                zoom={10}
              >
                {productDetails?.product.stores.map((store, index) => (
                  <Marker
                    key={index}
                    // @ts-ignore
                    position={{
                      lat: store.latitude,
                      lng: store.longitude
                    }}
                    onClick={this.handleMarkerClick(index)}
                  />
                ))}
              </Map>
            )}
          </Grid>
        </Grid>
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={4000}
          message="Ocorreu um erro. Tente novamente."
          onClose={closeSnackbar}
        />
      </>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
})(ProductDetailsView)