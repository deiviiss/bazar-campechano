export const roleDictionary: Record<string, string> = {
  seller: 'Vendedor',
  admin: 'Administrador',
  user: 'Usuario'
}

export const getRoleLabel = (role: string): string => {
  return roleDictionary[role] || 'Rol desconocido'
}
