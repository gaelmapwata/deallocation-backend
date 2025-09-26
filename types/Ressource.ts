export interface RessourceI {
  name: string;
  permissions: Array<{
    name: string;
    slug: string;
    description?: string;
  }>
}
