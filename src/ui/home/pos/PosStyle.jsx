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

/* --TITLE-CONTAINER-- */
.title-container {
  grid-area: title-container;
}

/* --FILTERING-CONTAINER-- */
.filtering-container {
  grid-area: filtering-container;
}

/* --TABLE-CONTAINER-- */
.table-container {
  grid-area: table-container;
  overflow: auto !important;
}

/* --PAGINATION-CONTAINER-- */
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

/* --TAB-CONTAINER:IS-CHECKOUT-LIST-- */
.tab-container.is-checkout-list {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr max-content;
  grid-template-areas: 
    "tab-checkout-list"
    "tab-checkout-total-container";
  row-gap: var(--app-spacing);
}
/* --TAB-CHECKOUT-LIST-- */
.tab-checkout-list {
    grid-area: tab-checkout-list;
    border: 1px solid var(--app-border-color);
    border-radius: 0;
    padding: 0;
    margin: 0;
    overflow: auto;
}
/* --TAB-CHECKOUT-LIST-ITEM-- */
.tab-checkout-list-item {
  border-bottom: 1px dashed var(--app-main-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(var(--app-padding) / 2);
}
.tab-checkout-list-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}
.tab-checkout-list-item-name {
    color: var(--app-main-color);
    font-size: 14px;
    font-weight: 500;
    margin: 0;
}
.tab-checkout-list-item-description {
    color: #6B6B6B;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: .5em;
}
.tab-checkout-list-item-total {
    color: var(--app-main-color);
    font-size: 13px;
    font-weight: 400;
    margin: 0;
}
/* --TAB-CHECKOUT-LIST-ITEM-QTY-BTN-GROUP-- */
.tab-checkout-list-item-qty-btn-group {
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
.tab-checkout-list-item-qty-btn-group > * {
    font-size: 16px;
    padding: 0 4px;
    width: 100%;
    margin-bottom: 0.2em;
    text-align: center;
}
.tab-checkout-list-item-qty-btn-group > *:last-child {
    margin-bottom: 0;
    border-bottom: none;
}
.tab-checkout-list-item-qty-btn-group-btn {
    background-color: var(--app-main-color);
    border-radius: 8px;
    color: #fff;
    text-decoration: none;
}
.tab-checkout-list-item-qty-btn-group-txt {
    color: var(--app-main-color);
    text-align: center;
    font-weight: 600;
    line-height: 1;
}
/* --TAB-CHECKOUT-LIST-ITEM-STATUS-- */
.tab-checkout-list-item-status {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--app-padding);
  font-size: 13px;
  font-weight: 500;
  text-align: center;
}

/* --TAB-CHECKOUT-TOTAL-CONTAINER-- */
.tab-checkout-total-container {
    grid-area: tab-checkout-total-container;
    border: 1px dashed var(--app-main-color);
    background-color: #F9FAFA;
    padding: calc(var(--app-padding) / 2);
}
.tab-checkout-total-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 16px;
    margin-bottom: var(--app-spacing);
}
.tab-checkout-total-item:last-child {
    margin-bottom: 0;
}
.tab-checkout-total-item-name {
    font-size: inherit;
    font-weight: 400;
    margin: 0;
    line-height: 1;
}
.tab-checkout-total-item-value {
    color: var(--app-main-color);
    font-size: inherit;
    font-weight: normal;
    margin: 0;
    line-height: 1;
}

/* --TAB-CONTAINER:IS-ORDER-INFO-- */
.tab-container.is-order-info {
  border: 1px solid var(--app-border-color);
  border-radius: 0;
}
.tab-order-info {
    padding: calc(var(--app-padding) / 2);
}

/* --PLACE-ORDER-BTN-CONTAINER-- */
.place-order-btn-container {
  grid-area: place-order-btn-container;
}
`
export default PosStyle