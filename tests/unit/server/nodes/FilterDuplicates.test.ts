import FilterDuplicates from '../../../../src/server/nodes/FilterDuplicates'
import Diagram from '../../TestableServerDiagram';

test.skip('something something', async () => {
    let node = Diagram.test().node(FilterDuplicates)
        .parameters({})

    await node.assertCanRun()
});