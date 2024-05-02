import { useDispatch, useSelector } from "react-redux";
import GenericMessage from "../../../util/classes/GenericMessage.js";
import { columns, columnsSize } from "./Util.jsx";
import DateHelper from "../../../util/helpers/DateHelper.js";
import StringHelper from "../../../util/helpers/StringHelper.js";
import { productCategories, rowsPerPages } from "../../../util/Config.jsx";
import { BiPlusCircle } from "react-icons/bi";
import { noSearchResults } from "../../../util/helper.jsx";
import { Button, SearchFieldInput, SelectInput, TDStatus, THeaders } from "../../common";
import { useContext } from "react";
import ModalType from "../../../util/classes/ModalType.js";
import ProductCategory from "../../../util/classes/ProductCategory.js";
import { InventoryContext } from "./InventoryProvider.jsx";
import { resetStates, setProduct, setSearchQuery, toggleModal } from "../../redux/inventorySlice.js";
import { isEmpty } from "lodash";

const VITE_DELAY = import.meta.VITE_DELAY;

function ProductsTable() {
  const dispatch = useDispatch();

  const { searchQuery } = useSelector((state) => state.inventory);
  const { apiResource, handleSearchProductsAsync } =
    useContext(InventoryContext);
  const { data, meta } = apiResource.data;

  const handleChange = (e) => {
    dispatch(
      setSearchQuery({
        ...searchQuery,
        [e.target.name]: e.target.value,
        page: 1,
      })
    );
    handleSearchProductsAsync.cancel();
  };

  const handlePrevious = () => {
    let page = searchQuery.page > 1 ? searchQuery.page - 1 : 1;
    dispatch(setSearchQuery({ ...searchQuery, page: page }));
    handleSearchProductsAsync.cancel();
  };
  const handleNext = () => {
    let page =
      searchQuery.page < meta.last_page ? searchQuery.page + 1 : meta.last_page;
    dispatch(setSearchQuery({ ...searchQuery, page: page }));
    handleSearchProductsAsync.cancel();
  };

  return (
    <>
      <FilteringContainer
        name={searchQuery.name}
        status={searchQuery.status}
        onChange={handleChange}
      />
      <TableContainer
        isLoading={apiResource.isLoading}
        searchQuery={searchQuery}
        data={data}
        error={apiResource.error}
      />
      <PaginationContainer
        rowsPerPage={searchQuery.per_page}
        currentPage={meta.current_page}
        lastPage={meta.last_page}
        isLoading={apiResource.isLoading}
        onChange={handleChange}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  );
}
function FilteringContainer({ name, category, onChange }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleModal({ modalType: ModalType.CREATE, open: true }));
  };

  return (
    <div className="filtering-container">
      <div className="row gx-2">
        <div className="col-6">
          <SearchFieldInput
            name="name"
            placeholder="Search by Product..."
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="col-6">
          <SelectInput
            name="category_id"
            options={productCategories}
            isOptional
            value={category}
            onChange={onChange}
            onRender={(option) => ProductCategory.toCategory(option)}
          />
        </div>
      </div>
      <div>
        <Button variant="light" onClick={handleClick}>
          <BiPlusCircle className="me-1" />
          Create Product
        </Button>
      </div>
    </div>
  );
}
function TableContainer({ isLoading, searchQuery, data, error }) {
  const dispatch = useDispatch();

  const handleUpdateClick = (product) => {
    // reset errors before showing modal
    dispatch(resetStates());
    dispatch(setProduct(product));

    // adding delay to finish the hiding effect of errors
    setTimeout(
      () =>
        dispatch(
          toggleModal({
            modalType: ModalType.UPDATE,
            open: true,
          })
        ),
      VITE_DELAY
    );
  };

  const handleRemoveClick = (product) => {
    dispatch(setProduct(product));
    dispatch(toggleModal({ modalType: ModalType.REMOVE, open: true }));
  };

  return (
    <div className="table-wrapper table-container">
      <table className="table">
        <thead>
          <THeaders columns={columns} />
        </thead>
        <tbody>
          {isLoading ? (
            <TDStatus colSpan={columnsSize}>
              {GenericMessage.PRODUCTS_FETCHING}
            </TDStatus>
          ) : error ? (
            <TDStatus colSpan={columnsSize}>
              {error.message ? error.message : GenericMessage.PRODUCTS_ERROR}
            </TDStatus>
          ) : noSearchResults(searchQuery, data) ? (
            <TDStatus colSpan={columnsSize}>
              {GenericMessage.PRODUCTS_NO_MATCH}
            </TDStatus>
          ) : isEmpty(data) ? (
            <TDStatus colSpan={columnsSize}>
              {GenericMessage.PRODUCTS_EMPTY}
            </TDStatus>
          ) : data ? (
            data.map((product, index) => (
              <TDProduct
                key={index}
                product={product}
                onUpdateClick={handleUpdateClick}
                onRemoveClick={handleRemoveClick}
              />
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
}

function TDProduct({ product, onUpdateClick, onRemoveClick }) {
  const productCode = StringHelper.truncate(product.product_code);
  const name = StringHelper.truncate(product.name);
  const description = StringHelper.truncate(product.description);
  const category = ProductCategory.toCategory(product.category_id);
  const stocks = StringHelper.toStocks(product.quantity);
  const srp = StringHelper.toPesoCurrency(product.srp);
  const memberPrice = StringHelper.toPesoCurrency(product.member_price);
  const createdBy = StringHelper.truncate(product.created_by);
  const dateCreated = DateHelper.toIsoStandard(product.created_at);
  const dateModified = DateHelper.toIsoStandard(product.updated_at);

  return (
    <tr key={product.id}>
      <td>{productCode}</td>
      <td>{name}</td>
      <td>{description}</td>
      <td>
        <span className="badge text-bg-light">{category}</span>
      </td>
      <td>{stocks}</td>
      <td>{srp}</td>
      <td>{memberPrice}</td>
      <td>{createdBy}</td>
      <td>{dateCreated}</td>
      <td>{dateModified}</td>
      <td className="hstack gap-1">
        <Button size="sm" onClick={() => onUpdateClick(product)}>
          Update
        </Button>
        <Button
          variant="light"
          size="sm"
          onClick={() => onRemoveClick(product)}
        >
          Remove
        </Button>
      </td>
    </tr>
  );
}
function PaginationContainer({
  rowsPerPage,
  currentPage,
  lastPage,
  isLoading,
  onChange,
  onPrevious,
  onNext,
}) {
  return (
    <div className="pagination-container">
      <div className="d-flex flex-row align-items-center gap-2">
        <label className="fw-medium fs-7 text-nowrap">Rows per page</label>
        <SelectInput
          name="per_page"
          options={rowsPerPages}
          value={rowsPerPage}
          onChange={onChange}
          onRender={(option) => `${option} rows`}
        />
      </div>
      <div className="d-flex flex-row align-items-center gap-2">
        <label className="fw-medium fs-7 text-nowrap">{`Page ${currentPage} of ${lastPage}`}</label>
        <div className="btn-group">
          <Button
            variant="light"
            isDisabled={isLoading || currentPage <= 1}
            onClick={onPrevious}
          >
            Prev
          </Button>
          <Button
            variant="light"
            isDisabled={isLoading || currentPage >= lastPage}
            onClick={onNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductsTable;
