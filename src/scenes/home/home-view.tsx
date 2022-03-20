import {
  FavoriteBorder,
  FavoriteOutlined, FirstPage as FirstPageIcon, KeyboardArrowLeft, KeyboardArrowRight, LastPage as LastPageIcon
} from '@mui/icons-material';
import {
  Box,
  CircularProgress, Grid, IconButton, Link, Table,
  TableBody,
  TableContainer, TableFooter, TableHead, TablePagination, TableRow
} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import React, { ReactElement } from 'react';
import { Routes } from '../../../utils/routes';
import Header from "../../components/header/header-view";
import { useAuthProvider } from "../../contexts/auth-provider";
import { useProductsProvider } from '../../contexts/products-provider';
import { currency } from "../../helpers/currency";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

interface Props {
  handleLogout: () => void;
  page: number;
  itemsPerPage: number;
  handlePageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  handleItemsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

const TablePaginationActions = (props: TablePaginationActionsProps) => {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </Box>
  );
}

const HomeView = ({
  handleLogout,
  page,
  itemsPerPage,
  handlePageChange,
  handleItemsPerPageChange,
}: Props): ReactElement => {
  const { user } = useAuthProvider()
  const { productsList, isFetching } = useProductsProvider()

  const renderContent = (): ReactElement => {
    if (isFetching) {
      return (
        <CircularProgress color="primary" size={60} />
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead >
            <TableRow>
              <StyledTableCell variant="head" >Nome</StyledTableCell>
              <StyledTableCell variant="head" align="center">Favorito</StyledTableCell>
              <StyledTableCell variant="head" align="center">Preço</StyledTableCell>
              <StyledTableCell variant="head" align="center">Detalhes</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsList?.products.map((product) => (
              <StyledTableRow key={product.id}>
                <TableCell variant="body">{product.name}</TableCell>
                <TableCell variant="body" align="center">{product.isFavorite ?
                  <FavoriteOutlined color="primary" /> :
                  <FavoriteBorder />
                }</TableCell>


                <TableCell variant="body" align="center">{currency.format(product.price)}</TableCell>
                <TableCell variant="head" align="center" >
                  <Link href={Routes.DETAILS.replace("{id}", product.id)}>Detalhes</Link>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                colSpan={4}
                count={productsList?.totalItems ?? 0}
                rowsPerPage={itemsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleItemsPerPageChange}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    )
  }

  return (
    <div>
      <Header
        currentRoute={Routes.HOME}
        userName={user?.name}
        title="Produtos"
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

export default HomeView;