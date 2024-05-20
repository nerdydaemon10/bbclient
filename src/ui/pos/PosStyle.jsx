import { createGlobalStyle } from "styled-components";

const PosStyle = createGlobalStyle`
.dashboard-main {
  grid-template-columns: 1fr 1fr 320px;
  grid-template-rows: max-content max-content 1fr max-content;
  grid-template-areas: 
    "title-section title-section title-section"
    "table-filter table-filter tabs"
    "table-data table-data tab"
    "table-pagination table-pagination place-order-btn";
}

/*--TITLE-SECTION-*/
.title-section {
  grid-area: title-section;
}
/*--TABLE-FILTER--*/
.table-filter { 
  grid-area: table-filter;
}
/*--TABLE-DATA--*/
.table-data {
  grid-area: table-data;
  overflow: auto !important;
}
/*--TABLE-PAGINATION--*/
.table-pagination {
  grid-area: table-pagination;
}

/* --TABS-- */
.tabs {
  grid-area: tabs;
}
/* --TAB-- */
.tab {
  grid-area: tab;
  display: grid;
  row-gap: 0;
  overflow: hidden;
}
/* --TAB:IS-CHECKOUTS-- */
.tab, 
.tab.is-checkouts {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr max-content;
  grid-template-areas: 
    "checkout-list"
    "receipt-list";
}
/* --CHECKOUT-LIST-- */
.checkout-list {
  grid-area: checkout-list;
  overflow-y: auto;
}
/*--RECEIPT-LIST--*/
.receipt-list {
  grid-area: receipt-list;
}
/* --TAB:IS-CUSTOMER-- */
.tab.is-customer {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 
    "customer-details";
}
/*--CUSTOMER-DETAILS--*/
.customer-details {
  grid-area: customer-details;
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

/* --PLACE-ORDER-BTN-- */
.place-order-btn {
  grid-area: place-order-btn;
}
`

export default PosStyle