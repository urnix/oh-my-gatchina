export interface CompanyAvatarStoragePathInfo {
  companyId: string;
}

export function getStoragePathToCompany(params: CompanyAvatarStoragePathInfo): string {
  let path = '';
  path += `companies/${params.companyId}/`;
  path += `avatar`;
  return path;
}

export function getStorageDownloadURL(params: {
  path: string;
  bucketName: string;
  firebaseStorageDownloadToken: string;
}): string {
  let path = '';
  path += `https://firebasestorage.googleapis.com/v0/b/${params.bucketName}/o/`;
  path += `${encodeURIComponent(params.path)}?`;
  path += `alt=media&token=${params.firebaseStorageDownloadToken}`;
  return path;
}
