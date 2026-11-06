# Paramqua

English-language water potability research demonstration with a light-blue and white interface.

## Model

Frozen SVM NoSMOTE, RBF kernel, threshold 0.5. Seven active measurements: pH, Hardness, Solids, Chloramines, Sulfate, Conductivity, and Trihalomethanes. Training-median imputation, derived features, scaling, and LIBSVM probability estimation run locally in the browser.

The JavaScript implementation matched Python predictions on 3,326 verification cases. Maximum absolute probability difference: 6.59e-14. This verifies implementation equivalence, not water-safety validity.

## Static deployment

Publish the repository root through a static host. No build, paid backend, API key, or running Colab session is required. A Render Blueprint is included; GitHub Pages can also serve the main branch root.

## Research limitations

Predictions follow the source dataset labels and are not certification of drinking-water safety or WHO compliance. Internal mean accuracy across nine outer folds: 67.75%; AUROC: 0.6908. Complete-measurement testing subset accuracy: 69.36%. These estimates do not guarantee accuracy on new samples.

Source dataset: https://www.kaggle.com/datasets/adityakadiwal/water-potability

## Synchronized candidate — 7 November 2026

The candidate was exported from the executed full-data notebook: 3,276 training rows, C=1, gamma=scale, fixed threshold=0.5. K1/K2/K3 are testing subsets from nested CV, not three separately trained website models.

`model.json` contains training medians, derived-feature scaling, support vectors and LIBSVM probability coefficients. `sha256` hashes the sorted model payload before the hash field is added. `dataset_sha256` identifies the original development CSV.

Parity was tested against Python on all 3,276 development inputs plus the fixed 50 Shenyu exploration inputs (3,326 cases). This is a software equivalence check, not 3,326 independent validation cases. The supplied research label is not a drinking-water safety certification.
