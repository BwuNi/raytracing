export default function (status: 'start' | 'complete' | 'error' | 'working' | number) {

    (<any>postMessage)({
        method: 'reportProgress',
        args: typeof status == 'number' ? ['working', status] : [status]
    });
    
}