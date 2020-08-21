import { AssemblyColors } from '@app/core/models';

import { consolidateGraphPosition, toGraphLink, toGraphNode } from '.';
import { DefaultGraphLink } from '../models';

describe('graph converters', () => {

  it('convert native assembly to graph node', () => {
    const expectedNode = { id: 'dll1', label: 'name (1)', color: AssemblyColors.native };

    const node = toGraphNode({
      id: 'dll1',
      isNative: true,
      isSoftware: false,
      name: 'name',
      version: '1'
    });

    expect(node).toEqual(expectedNode);
  });

  it('convert managed assembly to graph node', () => {
    const expectedNode = { id: 'dll1', label: 'name (1)', color: AssemblyColors.managed };

    const node = toGraphNode({
      id: 'dll1',
      isNative: false,
      isSoftware: false,
      name: 'name',
      version: '1'
    });

    expect(node).toEqual(expectedNode);
  });

  it('convert assembly to graph node and force color', () => {
    const expectedNode = { id: 'dll1', label: 'name (1)', color: 'black' };

    const node = toGraphNode({
      id: 'dll1',
      isNative: false,
      isSoftware: false,
      name: 'name',
      version: '1'
    }, 'black');

    expect(node).toEqual(expectedNode);
  });

  it('convert assembly link to graph link', () => {
    const expectedLink =  new DefaultGraphLink({ source: '1', target: '2', value: 10 });
    const link = toGraphLink({ sourceId: '1', targetId: '2' });
    expect(link).toEqual(expectedLink);
  });


  it('not consolidation graph position', () => {
    const initialGraph = {
      nodes: [ { id: 'dll1', label: 'name (1)', color: 'black' } ],
      links: [ ]
    };

    const result = consolidateGraphPosition(initialGraph, undefined);

    expect(result.nodes[0].x).toBeFalsy();
    expect(result.nodes[0].y).toBeFalsy();
  });


  it('consolidation graph position', () => {
    const initialGraph = {
      nodes: [ { id: 'dll1', label: 'name (1)', color: 'black'  } ],
      links: [ ]
    };

    const oldGraphGraph = {
      nodes: [ { id: 'dll1', label: '', color: 'black', x: 123, y: 2  } ],
      links: [ ]
    };

    const result = consolidateGraphPosition(initialGraph, oldGraphGraph);

    expect(result.nodes[0]).toEqual( { id: 'dll1', label: 'name (1)', color: 'black', x: 123, y: 2 });
  });

  it('should not update new node postion', () => {
    const initialGraph = {
      nodes: [ { id: 'dll1', label: 'name (1)', color: 'black'  } ],
      links: [ ]
    };

    const oldGraphGraph = {
      nodes: [ { id: 'dll2', label: '', color: 'black', x: 123, y: 2  }],
      links: [ ]
    };

    const result = consolidateGraphPosition(initialGraph, oldGraphGraph);

    expect(result.nodes[0].x).toBeFalsy();
    expect(result.nodes[0].y).toBeFalsy();
  });

});
