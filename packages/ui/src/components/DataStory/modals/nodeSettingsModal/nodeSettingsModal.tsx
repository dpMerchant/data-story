import { Params, InputSchemas, OutputSchemas, Config, Code } from './tabs';
import { shallow } from 'zustand/shallow';
import { StoreSchema, useStore } from '../../store/store';
import { useForm } from 'react-hook-form';
import { DataStoryNode } from '../../../Node/DataStoryNode';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useState } from 'react';
import { Param, ParamValue, pascalToSentenceCase } from '@data-story/core';

type TabKey = 'Params' | 'InputSchemas' | 'OutputSchemas' | 'Code' | 'Config';

const TAB_COMPONENTS: Record<TabKey, React.ComponentType<any>> = {
  Params,
  InputSchemas,
  OutputSchemas,
  Code,
  Config,
};

export const NodeSettingsModal = () => {
  const [tab, setTab] = useState<TabKey>('Params')

  const selector = (state: StoreSchema) => ({
    nodes: state.nodes,
    openNodeModalId: state.openNodeModalId,
    setOpenNodeModalId: state.setOpenNodeModalId,
    refreshNodes: state.refreshNodes,
  });  

  const { nodes, openNodeModalId, setOpenNodeModalId } = useStore(selector, shallow);

  const node = nodes.find((node: DataStoryNode) => node.id === openNodeModalId)!

  const defaultParamValues = Object.values(node.data.params).reduce((acc: Record<string, ParamValue>, param: Param) => {
    acc[param.name] = param.value
    return acc
  }, {})

  const form = useForm({
    defaultValues: {
      ...defaultParamValues,
      ...{ label: node.data.label} as Record<string, any>
    }
  });

  const close = () => setOpenNodeModalId(null);

  const saveAndClose = () => {
    form.handleSubmit((submitted) => {
      for (const [key, value] of Object.entries(submitted)) {
        node.data.params[key].value = value
      }      

      node.data.label = submitted.label
    })()
    
    close()
  }

  useEscapeKey(close);

  const TabComponent = TAB_COMPONENTS[tab as keyof typeof TAB_COMPONENTS];

  return <>
    <div className="flex justify-center overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
      <form
        className="relative w-full max-w-4xl my-8 mx-auto px-8"
      >
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between px-8 py-2 border-solid border-slate-200 rounded-t">
            <input
              {...form.register('label')}
              className="pr-4 bg-white mt-4 flex flex-col align-center justify-middleitems-center justify-center text-lg text-gray-400 font-bold tracking widest"
            />
            <div className="cursor-pointer p-1 ml-auto text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={close}>
              <span className="text-gray-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </div>
          </div>
          <div className="mx-8 flex space-x-8 text-xxs uppercase text-gray-400">           
            {Object.keys(TAB_COMPONENTS).map((key) => (
              <div
                key={key}
                onClick={() => setTab(key as TabKey)}
                className={`pb-2 hover:text-gray-500 cursor-pointer ${tab === key && "border-b-2 border-blue-400"}`}
              >
                {pascalToSentenceCase(key)}
              </div>
            ))}
          </div>

          <TabComponent node={node} register={form.register} form={form}/>
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button className="text-gray-500 focus:text-gray-800 background-transparent font-bold uppercase px-6 py-2 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={close}>
              Close
            </button>
            {<button className="bg-blue-500 focus:bg-blue-700 text-white active:bg-blue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={saveAndClose}>
              Save
            </button>}
          </div>
          <div className="h-12"></div>
        </div>
      </form>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>;
}