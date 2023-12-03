        // Render the chart only when both item1Data and sharedMolecules are available
    const isDataReady = item1Data && sharedMolecules.length > 0;

    const dataItem1 = isDataReady
        ? [
              {
                  id: sharedMolecules.length + ' Molecules in common',
                  label: 'Shared label',
                  value: sharedMolecules.length,
                  color: 'hsl(90, 70%, 50%)',
              },
              {
                  id: (countWordsInString(item1Data.molecules) - sharedMolecules.length) + ' Molecules isolated',
                  label: 'total label',
                  value: item1Data && item1Data.molecules ? countWordsInString(item1Data.molecules) - sharedMolecules.length : 0,
                  // value: item1Data.molecules.length,
                  // value: Array.isArray(item1Data?.molecules) ? item1Data.molecules.length - sharedMolecules.length : 0,
                  color: 'hsl(56, 70%, 50%)',
              },
          ]
        : [];


    // Render the chart only when both item2Data and sharedMolecules are available
    const isDataReadyItem2 = item2Data && sharedMolecules.length > 0;

    const dataItem2 = isDataReadyItem2
        ? [
              {
                  id: sharedMolecules.length + ' Molecules in common',
                  label: 'Shared label',
                  value: sharedMolecules.length,
                  color: 'hsl(90, 70%, 50%)',
              },
              {
                  id: (countWordsInString(item2Data.molecules) - sharedMolecules.length) + ' Molecules isolated',
                  label: 'total label',
                  value: item2Data && item2Data.molecules ? countWordsInString(item2Data.molecules) - sharedMolecules.length : 0,
                  color: 'hsl(56, 70%, 50%)',
              },
          ]
        : [];