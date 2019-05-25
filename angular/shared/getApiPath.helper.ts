import { environment } from '../apps/eatery/src/environments/environment';

export function getApiPath() {
  const baseUrl = environment.baseUrl.endsWith('/')
    ? environment.baseUrl.substr(0, environment.baseUrl.length - 1)
    : environment.baseUrl;
  return `${baseUrl}/api`;
}

export enum Routers {
  products = 'products',
  suppliers = 'suppliers',
  XeroInvoicesSend = 'xero/invoices-send',
  xeroConnect = 'xero/connect',
  xeroDisconnect = 'xero/disconnect',
  xeroEntities = 'xero/entities',
  xeroDeleteInvoices = 'xero/delete-invoices',
  xeroReexportInvoices = 'xero/reexport-invoices'
}

export function getApiSuppliersPath() {
  return `${getApiPath()}/${Routers.suppliers}`;
}

export function getApiProductsPath() {
  return `${getApiPath()}/${Routers.products}`;
}

export function getApiXeroExportPath() {
  return `${getApiPath()}/${Routers.XeroInvoicesSend}`;
}

export function getApiXeroConnectPath() {
  return `${getApiPath()}/${Routers.xeroConnect}`;
}

export function getApiXeroDisconnectPath() {
  return `${getApiPath()}/${Routers.xeroDisconnect}`;
}

export function getApiXeroGetEntitiesPath() {
  return `${getApiPath()}/${Routers.xeroEntities}`;
}

export function getApiXeroDeleteInvoicesPath() {
  return `${getApiPath()}/${Routers.xeroDeleteInvoices}`;
}

export function getApiXeroReexportInvoicesPath() {
  return `${getApiPath()}/${Routers.xeroReexportInvoices}`;
}
