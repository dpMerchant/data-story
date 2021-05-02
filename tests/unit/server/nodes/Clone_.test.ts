import Clone_ from '../../../../src/server/nodes/Clone_'
import Diagram from '../../TestableServerDiagram';

test.skip('something something', async () => {
    let node = Diagram.test().node(Clone_)
        .parameters({})

    await node.assertCanRun()
});