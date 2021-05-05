import DownloadGeoJSON from '../../../../src/server/nodes/DownloadGeoJSON'
import Diagram from '../../TestableServerDiagram';

test.skip('something something', async () => {
    let node = Diagram.test().node(DownloadGeoJSON)
        .parameters({})

    await node.assertCanRun()
});