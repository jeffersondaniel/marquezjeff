package marquez.service;

public class NamespaceServiceTest {
  // private final NamespaceName NAMESPACE_NAME = NamespaceName.fromString("test");
  //
  // private static final NamespaceDao namespaceDao = mock(NamespaceDao.class);
  // NamespaceService namespaceService = new NamespaceService(namespaceDao);
  //
  // @After
  // public void teardown() {
  //   reset(namespaceDao);
  // }
  //
  // @Test
  // public void testCreate() throws MarquezServiceException {
  //   final NamespaceRow row = newNamespaceRow();
  //   final Namespace newNamespace = NamespaceMapper.map(row);
  //   final NamespaceName name = NamespaceName.fromString(newNamespace.getName());
  //   when(namespaceDao.findBy(name)).thenReturn(Optional.of(row));
  //
  //   final Namespace namespace = namespaceService.create(newNamespace);
  //   verify(namespaceDao).insert(any(Namespace.class));
  //   assertEquals(namespace.getName(), row.getName());
  //   assertEquals(namespace.getOwnerName(), row.getCurrentOwnerName());
  //   assertEquals(namespace.getDescription(), row.getDescription());
  // }
  //
  // @Test(expected = MarquezServiceException.class)
  // public void testCreate_findException() throws MarquezServiceException {
  //   Namespace ns = Generator.genNamespace();
  //   doThrow(UnableToExecuteStatementException.class).when(namespaceDao).findBy(NAMESPACE_NAME);
  //   namespaceService.create(ns);
  // }
  //
  // @Test(expected = MarquezServiceException.class)
  // public void testCreate_insertException() throws MarquezServiceException {
  //   Namespace ns = Generator.genNamespace();
  //   doThrow(UnableToExecuteStatementException.class)
  //       .when(namespaceDao)
  //       .insert(any(Namespace.class));
  //   namespaceService.create(ns);
  // }
  //
  // @Test
  // public void testExists() throws MarquezServiceException {
  //   final NamespaceName found = NamespaceName.fromString("test0");
  //   final NamespaceName notFound = NamespaceName.fromString("test1");
  //
  //   when(namespaceDao.exists(found)).thenReturn(true);
  //   assertTrue(namespaceService.exists(found));
  //   when(namespaceDao.exists(notFound)).thenReturn(false);
  //   assertFalse(namespaceService.exists(notFound));
  // }
  //
  // @Test(expected = MarquezServiceException.class)
  // public void testExists_findException() throws MarquezServiceException {
  //   doThrow(UnableToExecuteStatementException.class).when(namespaceDao).exists(NAMESPACE_NAME);
  //   namespaceService.exists(NAMESPACE_NAME);
  // }
  //
  // @Test
  // public void testGet_NsExists() throws MarquezServiceException {
  //   Namespace ns = Generator.genNamespace();
  //   final NamespaceName namespaceName = NamespaceName.fromString(ns.getName());
  //   when(namespaceDao.findBy(namespaceName)).thenReturn(Optional.of(any()));
  //   Optional<Namespace> nsOptional = namespaceService.get(namespaceName);
  //   assertTrue(nsOptional.isPresent());
  // }
  //
  // @Test
  // public void testGet_NsNotFound() throws MarquezServiceException {
  //   Namespace ns = Generator.genNamespace();
  //   final NamespaceName namespaceName = NamespaceName.fromString(ns.getName());
  //   when(namespaceDao.findBy(namespaceName)).thenReturn(Optional.empty());
  //   Optional<Namespace> namespaceIfFound = namespaceService.get(namespaceName);
  //   assertFalse(namespaceIfFound.isPresent());
  // }
  //
  // @Test(expected = MarquezServiceException.class)
  // public void testGet_findException() throws MarquezServiceException {
  //   doThrow(UnableToExecuteStatementException.class).when(namespaceDao).findBy(NAMESPACE_NAME);
  //   namespaceService.get(NAMESPACE_NAME);
  // }
  //
  // @Test
  // public void testListNamespaces() throws MarquezServiceException {
  //   List<Namespace> namespaces =
  //       new ArrayList<Namespace>(Arrays.asList(Generator.genNamespace(),
  // Generator.genNamespace()));
  //   when(namespaceDao.findAll()).thenReturn(namespaces);
  //   List<Namespace> namespacesFound = namespaceService.getAll();
  //   assertEquals(namespaces.size(), namespacesFound.size());
  // }
  //
  // @Test
  // public void testListNamespaces_Empty() throws MarquezServiceException {
  //   when(namespaceDao.findAll()).thenReturn(new ArrayList<Namespace>());
  //   List<Namespace> namespacesFound = namespaceService.getAll();
  //   assertEquals(0, namespacesFound.size());
  // }
  //
  // @Test(expected = MarquezServiceException.class)
  // public void testListNamespaces_findAllException() throws MarquezServiceException {
  //   doThrow(UnableToExecuteStatementException.class).when(namespaceDao).findAll();
  //   namespaceService.getAll();
  // }
}
