import {
  FavoriteBorder,
  FavoriteOutlined
} from '@mui/icons-material';
import {
  CircularProgress, Grid,
  Link, Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { ReactElement } from 'react';
import { Routes } from '../../../utils/routes';
import Header from '../../components/header/header-view';
import { currency } from "../../helpers/currency";
import { FavoriteProducts } from '../../models/favorite-products';
import { User } from '../../models/user';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';


interface Props {
  user?: User;
  favoriteProducts?: FavoriteProducts;
  isFetching: boolean;
}

const FavoritesView = ({
  user,
  favoriteProducts,
  isFetching
}: Props): ReactElement => {
  const renderContent = (): ReactElement => {
    if (isFetching) {
      return (
        <CircularProgress color="primary" />
      )
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));

    return (
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableCell variant="head">Nome</StyledTableCell>
            <StyledTableCell variant="head" align="right">Favorito</StyledTableCell>
            <StyledTableCell variant="head" align="right">Preço</StyledTableCell>
            <StyledTableCell variant="head" align="right">Detalhes</StyledTableCell>
          </TableHead>
          <TableBody>
            {favoriteProducts?.products.map((product, index) => (
              <StyledTableRow key={index}>
                <TableCell variant="body">{product.name}</TableCell>
                <TableCell variant="body" align="center">{product.isFavorite ?
                  <FavoriteOutlined color="primary" /> :
                  <FavoriteBorder />
                }</TableCell>
                <TableCell variant="body" align="right">{currency.format(product.price)}</TableCell>
                <TableCell variant="head" align="right" >
                  <Link href={`/products/${product.id}`}>Detalhes</Link>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <div>
      <Header
        userName={user?.name}
        currentRoute={Routes.FAVORITES}
        title="Favoritos"
      />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        height="100%"
        width="100%"
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          xs={8}
          marginTop={2}
          marginBottom={4}
        >
          {renderContent()}
        </Grid>
      </Grid>
    </div>
  )
}

export default FavoritesView;

