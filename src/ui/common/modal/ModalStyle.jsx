import { createGlobalStyle } from "styled-components";

const ModalStyle = createGlobalStyle`
.x-modal-container {
  background: rgba(0, 0, 0, .7);
  filter: opacity(0);
  pointer-events: none;
  user-select: none;
  cursor: none;
  transition: ease .2s;
  z-index: 999;
}
.x-modal-container.is-open {
  filter: opacity(1);
  pointer-events: all;
  cursor: auto;
}

.x-modal {
  width: 540px;
}

.x-modal-header {}
.x-modal-body {}

.x-modal-body-text {
  color: #71717A;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  line-height: 1;
}
.x-modal-body-text > b {
  color: var(--app-main-color);;
}
.x-modal-footer {}
.x-modal-footer > * {}
.x-modal-footer > *:last-child {}
`

export default ModalStyle