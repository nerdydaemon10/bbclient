import { createGlobalStyle } from "styled-components";

const PosStyle = createGlobalStyle`
.dashboard-main {
  grid-template-columns: 1fr 1fr 0.7fr;
  grid-template-rows: max-content max-content 1fr max-content;
  grid-template-areas: 
    "title-container title-container title-container"
    "filtering-container filtering-container tabs-container"
    "table-container table-container tab-container"
    "pagination-container pagination-container place-order-btn-container";
}

/*--BREADCRUMB-CONTAINER--*/
.breadcrumb-container {
  box-shadow: none;
  border-color: transparent;
  padding: 0;
  grid-area: breadcrumb-container;
  margin-bottom: 14px
}

/*--TITLE-CONTAINER--*/
.title-container {
  grid-area: title-container;
}

/* --FILTERING-CONTAINER-- */
.filtering-container {
  grid-area: filtering-container;
}
.filtering-container.is-products-table {
  display: flex;
}
.filtering-container.is-customers-table {
  display: block;
}

/*--TABLE-CONTAINER--*/
.table-container {
  grid-area: table-container;
  overflow: auto !important;
}

/*--PAGINATION-CONTAINER--*/
.pagination-container {
  grid-area: pagination-container;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* --TABS-CONTAINER-- */
.tabs-container {
  grid-area: tabs-container;
}

/* --TAB-CONTAINER-- */
.tab-container {
  grid-area: tab-container;
  display: grid;
  row-gap: 0;
  overflow: hidden;
}

/* --TAB-CONTAINER:IS-CHECKOUTS-- */
.tab-container.is-checkouts {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr max-content;
  grid-template-areas: 
    "checkout-list"
    "checkout-details";
  row-gap: var(--app-spacing);
}
/* --CHECKOUT-LIST-- */
.checkout-list {
  grid-area: checkout-list;
  border: 1px solid var(--app-border-color);
  border-radius: var(--bs-border-radius);
  padding: 0;
  margin: 0;
  overflow: auto;
}
.checkout-list-item {
  border: 1px dashed transparent;
  border-radius: var(--bs-border-radius);
  padding: calc(var(--app-padding) / 2);
}
.checkout-list-item:nth-child(odd) {
  border: 1px dashed var(--app-main-color);
  background-color: #F9F9FA;
}
.checkout-list-item-name {
  color: var(--app-main-color);
  font-size: 15px;
  font-weight: 600;
  margin: 0;
  line-height: 1;
}
.checkout-list-item-description {
  color: #6B6B6B;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: .5em;
}
.checkout-list-item-meta {
  color: var(--app-main-color);
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  line-height: 1;
}
.checkout-list-item-empty {
  font-size: 13px;
  font-weight: 500;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
/*--CHECKOUT-DETAILS--*/
.checkout-details {
  grid-area: checkout-details;
  border: 1px dashed var(--app-main-color);
  border-radius: var(--bs-border-radius);
  background-color: #F9FAFA;
  padding: calc(var(--app-padding) / 2);
}
.checkout-details-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 16px;
  margin-bottom: var(--app-spacing);
}
.checkout-details-item:last-child {
  margin-bottom: 0;
}
.checkout-details-item-name {
  font-size: inherit;
  font-weight: 400;
  margin: 0;
  line-height: 1;
}
.checkout-details-item-value {
  color: var(--app-main-color);
  font-size: inherit;
  font-weight: normal;
  margin: 0;
  line-height: 1;
}
/* --TAB-CONTAINER:IS-ORDER-INFO-- */
.tab-container.is-customer {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 
    "customer-details";
}
/*--CUSTOMER-DETAILS--*/
.customer-details {
  grid-area: customer-details;
  padding: calc(var(--app-padding) / 2);
  border: 1px solid var(--app-border-color);
  border-radius: var(--bs-border-radius);
}
.customer-details.is-empty {
  font-size: 13px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

/* --PLACE-ORDER-BTN-CONTAINER-- */
.place-order-btn-container {
  grid-area: place-order-btn-container;
}

/* --QUANITY-BUTTON-- */
.qty-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border: 1px solid var(--app-border-color);
  border-radius: 12px;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, .4);
  padding: 4px;
  height: max-content;
}
.qty-group > * {
  font-size: 16px;
  padding: 0 4px;
  width: 26.5px;
  margin-bottom: 0.2em;
  text-align: center;
}
.qty-group > *:last-child {
  margin-bottom: 0;
  border-bottom: none;
}
.qty-group-btn {
  background-color: var(--app-main-color);
  border-radius: 8px;
  color: #fff;
  text-decoration: none;
}
.qty-group-txt {
  color: var(--app-main-color);
  text-align: center;
  font-weight: 600;
  line-height: 1;
}
`

export default PosStyle